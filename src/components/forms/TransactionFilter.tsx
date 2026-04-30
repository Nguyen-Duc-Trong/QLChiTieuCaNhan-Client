import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import dayjs, { Dayjs } from 'dayjs';
import type { TransactionFilter as FilterType, TransactionType } from '../../types';
import { mockCategories } from '../../data/mockData';

interface TransactionFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function TransactionFilterComponent({ filter, onFilterChange }: TransactionFilterProps) {
  const handleChange = (key: keyof FilterType, value: string | undefined) => {
    onFilterChange({ ...filter, [key]: value || undefined });
  };

  const handleDateChange = (key: 'startDate' | 'endDate', date: Dayjs | null) => {
    onFilterChange({ ...filter, [key]: date?.format('YYYY-MM-DD') || undefined });
  };

  const handleClear = () => {
    onFilterChange({});
  };

  const filteredCategories = filter.type
    ? mockCategories.filter((cat) => cat.type === filter.type)
    : mockCategories;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        mb: 2,
      }}
    >
      <TextField
        size="small"
        placeholder="Tim kiem..."
        value={filter.search || ''}
        onChange={(e) => handleChange('search', e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ minWidth: 200 }}
      />

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Loai</InputLabel>
        <Select
          value={filter.type || ''}
          label="Loai"
          onChange={(e) => handleChange('type', e.target.value as TransactionType)}
        >
          <MenuItem value="">Tat ca</MenuItem>
          <MenuItem value="INCOME">Thu nhap</MenuItem>
          <MenuItem value="EXPENSE">Chi tieu</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Danh muc</InputLabel>
        <Select
          value={filter.categoryId || ''}
          label="Danh muc"
          onChange={(e) => handleChange('categoryId', e.target.value)}
        >
          <MenuItem value="">Tat ca</MenuItem>
          {filteredCategories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DatePicker
        label="Tu ngay"
        value={filter.startDate ? dayjs(filter.startDate) : null}
        onChange={(date) => handleDateChange('startDate', date)}
        slotProps={{
          textField: { size: 'small', sx: { minWidth: 150 } },
        }}
      />

      <DatePicker
        label="Den ngay"
        value={filter.endDate ? dayjs(filter.endDate) : null}
        onChange={(date) => handleDateChange('endDate', date)}
        slotProps={{
          textField: { size: 'small', sx: { minWidth: 150 } },
        }}
      />

      <Button
        variant="outlined"
        color="inherit"
        startIcon={<FilterAltOffIcon />}
        onClick={handleClear}
        size="small"
      >
        Xoa bo loc
      </Button>
    </Box>
  );
}
