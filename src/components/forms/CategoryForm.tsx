import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormHelperText,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, type CategoryFormData } from '../../schemas/category';
import type { Category } from '../../types';

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
  category?: Category | null;
}

const colorOptions = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
];

export default function CategoryForm({ open, onClose, onSubmit, category }: CategoryFormProps) {
  const isEdit = Boolean(category);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      type: 'EXPENSE',
      color: '#f44336',
    },
  });

  const selectedColor = watch('color');

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        type: category.type,
        color: category.color || '#f44336',
      });
    } else {
      reset({
        name: '',
        type: 'EXPENSE',
        color: '#f44336',
      });
    }
  }, [category, reset, open]);

  const handleFormSubmit = (data: CategoryFormData) => {
    onSubmit(data);
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Sua danh muc' : 'Them danh muc moi'}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Box>
                  <ToggleButtonGroup {...field} exclusive fullWidth color="primary">
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
                  {errors.type && <FormHelperText error>{errors.type.message}</FormHelperText>}
                </Box>
              )}
            />

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ten danh muc"
                  fullWidth
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Box>
              <Box sx={{ mb: 1, color: 'text.secondary', fontSize: 14 }}>Mau sac</Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {colorOptions.map((color) => (
                  <Box
                    key={color}
                    onClick={() => setValue('color', color)}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      bgcolor: color,
                      cursor: 'pointer',
                      border: selectedColor === color ? '3px solid #212121' : '3px solid transparent',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </Box>
            </Box>
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
