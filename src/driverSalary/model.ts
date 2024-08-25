import { z } from "zod";

export type DriverSalary = z.infer<typeof DriverSalarySchema>;
export type DriverSalaryWithTotalRow = DriverSalary & {total_row: number};
export const DriverSalarySchema = z.object({
    driver_code : z.string(),
    name : z.string(),
    total_pending : z.coerce.number().int(),
    total_confirmed : z.coerce.number().int(),
    total_paid : z.coerce.number().int(),
    total_attendance_salary : z.coerce.number().int(),
    total_salary : z.coerce.number().int(),
    count_shipment : z.coerce.number().int(),
});

export type DriverSalaryGetParams = z.infer<typeof DriverSalaryGetParamsSchema>;
export const DriverSalaryGetParamsSchema = z.object({
    month: z.coerce.number().int({ message: 'please input valid month 1-12' })
        .min(1, { message: 'please input valid month 1-12' })
        .max(12, { message: 'please input valid month 1-12' }),
    year: z.coerce.number().int({ message: 'please input valid year' })
        .min(1900, { message: 'please input valid year' })
        .max(3000, { message: 'please input valid year' }),
    page_size: z.coerce.number().int().default(10),
    current: z.coerce.number().int().default(1),
    driver_code: z.string().optional(),
    status: z.enum(['PENDING', 'CONFIRMED', 'PAID']).optional(),
    name: z.string().default(''),
});
