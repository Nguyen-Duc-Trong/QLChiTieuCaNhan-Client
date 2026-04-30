import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z
    .number({ error: 'Vui long nhap so tien' })
    .positive('So tien phai lon hon 0'),
  type: z.enum(['INCOME', 'EXPENSE'] as const, { error: 'Vui long chon loai giao dich' }),
  categoryId: z.string({ error: 'Vui long chon danh muc' }).min(1, 'Vui long chon danh muc'),
  date: z.string({ error: 'Vui long chon ngay' }).min(1, 'Vui long chon ngay'),
  note: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
