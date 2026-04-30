import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string({ required_error: 'Vui long nhap ten danh muc' })
    .min(1, 'Vui long nhap ten danh muc')
    .max(50, 'Ten danh muc toi da 50 ky tu'),
  type: z.enum(['INCOME', 'EXPENSE'], { required_error: 'Vui long chon loai danh muc' }),
  color: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
