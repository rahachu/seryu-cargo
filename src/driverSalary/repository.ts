import db from '@/common/configs/db';
import { DriverSalary, DriverSalaryGetParams } from './model';

export class DriverSalaryRepository {
    static findDriverSalaryWithFilter(req: DriverSalaryGetParams): Promise<DriverSalary[]> {
        const getWhereStatus = () => {
            if (req.status == 'CONFIRMED') {
                return 'AND total_confirmed > 0'
            } else if (req.status == 'PENDING') {
                return 'AND total_pending > 0'
            } else if (req.status == 'PAID') {
                return 'AND total_paid > 0 AND total_confirmed = 0 AND total_pending = 0'
            } else {
                return ''
            }
        }

        return db.any(`
            WITH driver_attendance_salary AS (SELECT value FROM variable_configs WHERE key = 'DRIVER_MONTHLY_ATTENDANCE_SALARY'),
            driver_salary_result AS (SELECT d.name, d.driver_code,
            FLOOR(SUM(CASE WHEN sc.cost_status = 'PENDING' then sc.total_costs ELSE 0 END)) as total_pending,
            FLOOR(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' then sc.total_costs ELSE 0 END)) as total_confirmed,
            FLOOR(SUM(CASE WHEN sc.cost_status = 'PAID' then sc.total_costs ELSE 0 END)) as total_paid,
            (SELECT count(attendance_date) * (SELECT value FROM driver_attendance_salary)
                FROM driver_attendances da WHERE da.driver_code = d.driver_code
                AND EXTRACT(MONTH from da.attendance_date) = $/month/ AND EXTRACT(YEAR from da.attendance_date) = $/year/
            ) as total_attendance_salary,
            COUNT(distinct sc.shipment_no) as count_shipment
            FROM drivers d JOIN
            shipment_costs sc ON d.driver_code = sc.driver_code JOIN
            shipments s ON s.shipment_no = sc.shipment_no
            where LOWER(d.name) LIKE '%' || LOWER($/name/) || '%'
            AND EXTRACT(MONTH from s.shipment_date) = $/month/ AND EXTRACT(YEAR from s.shipment_date) = $/year/
            AND s.shipment_status <> 'CANCELLED'
            ${req.driver_code ? 'AND $/driver_code/ = d.driver_code ' : ''}
            GROUP BY d.name, d.driver_code, d.id
            ORDER BY d.id asc)

            SELECT *, (total_pending + total_confirmed + total_paid + total_attendance_salary)
            as total_salary FROM driver_salary_result
            WHERE (total_pending + total_confirmed + total_paid + total_attendance_salary) > 0
            ${
                req.status ?
                getWhereStatus()
                : ''
            }
            LIMIT $/page_size/ OFFSET $/current/ - 1;
        `, req);
    }
}
