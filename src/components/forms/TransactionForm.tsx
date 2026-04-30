import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { transactionSchema, type TransactionFormData } from '../../schemas/transaction';
import type { Transaction, Category, TransactionType } from '../../types';
import { mockCategories } from '../../data/mockData';

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => void;
  transaction?: Transaction | null;
}

export default function TransactionForm({ open, onClose, onSubmit, transaction }: TransactionFormProps) {
  const isEdit = Boolean(transaction);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      type: 'EXPENSE',
      categoryId: '',
      date: dayjs().format('YYYY-MM-DD'),
      note: '',
    },
  });

  const selectedType = watch('type');

  const filteredCategories: Category[] = mockCategories.filter(
    (cat) => cat.type === selectedType
  );

  useEffect(() => {
    if (transaction) {
      reset({
        amount: transaction.amount,
        type: transaction.type,
        categoryId: transaction.categoryId,
        date: transaction.date,
        note: transaction.note || '',
      });
    } else {
      reset({
        amount: 0,
        type: 'EXPENSE',
        categoryId: '',
        date: dayjs().format('YYYY-MM-DD'),
        note: '',
      });
    }
  }, [transaction, reset, open]);

  const handleFormSubmit = (data: TransactionFormData) => {
    onSubmit(data);
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Sua giao dich' : 'Them giao dich moi'}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Box>
                  <ToggleButtonGroup
                    {...field}
                    exclusive
                    fullWidth
                    color="primary"
                  >
                    <ToggleButton
                      value="EXPENSE"
                      sx={{
                        '&.Mui-selected': {
                          bgcolor: 'error.main',
                          color: 'error.contrastText',
                          '&:hover': { bgcolor: 'error.dark' },
                        },
                      }}
                    >
                      Chi tieu
                    </ToggleButton>
                    <ToggleButton
                      value="INCOME"
                      sx={{
                        '&.Mui-selected': {
                          bgcolor: 'success.main',
                          color: 'success.contrastText',
                          '&:hover': { bgcolor: 'success.dark' },
                        },
                      }}
                    >
                      Thu nhap
                    </ToggleButton>
                  </ToggleButtonGroup>
                  {errors.type && (
                    <FormHelperText error>{errors.type.message}</FormHelperText>
                  )}
                </Box>
              )}
            />

            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="So tien"
                  type="number"
                  fullWidth
                  error={Boolean(errors.amount)}
                  helperText={errors.amount?.message}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                  }}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.categoryId)}>
                  <InputLabel>Danh muc</InputLabel>
                  <Select {...field} label="Danh muc">
                    {filteredCategories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.categoryId && (
                    <FormHelperText>{errors.categoryId.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Ngay"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.format('YYYY-MM-DD') || '')}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: Boolean(errors.date),
                      helperText: errors.date?.message,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ghi chu"
                  multiline
                  rows={3}
                  fullWidth
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Huy
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isEdit ? 'Luu thay doi' : 'Them moi'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
