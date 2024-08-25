import { z } from "zod";

export type DriverSalary = z.infer<typeof DriverSalarySchema>;
export const DriverSalarySchema = z.object({
    driver_code : z.string(),
    name : z.string(),
    total_pending : z.number().int(),
    total_confirmed : z.number().int(),
    total_paid : z.number().int(),
    total_attendance_salary : z.number().int(),
    total_salary : z.number().int(),
    count_shipment : z.number().int(),
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
