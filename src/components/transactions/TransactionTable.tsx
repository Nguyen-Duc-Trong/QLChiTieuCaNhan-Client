import { useMemo } from 'react';
import { DataGrid, type GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Chip, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/format';

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export default function TransactionTable({
  transactions,
  loading = false,
  onEdit,
  onDelete,
}: TransactionTableProps) {
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'date',
        headerName: 'Ngay',
        width: 120,
        valueFormatter: (value: string) => formatDate(value),
      },
      {
        field: 'type',
        headerName: 'Loai',
        width: 120,
        renderCell: (params) => (
          <Chip
            label={params.value === 'INCOME' ? 'Thu nhap' : 'Chi tieu'}
            color={params.value === 'INCOME' ? 'success' : 'error'}
            size="small"
          />
        ),
      },
      {
        field: 'category',
        headerName: 'Danh muc',
        width: 150,
        valueGetter: (_value, row) => row.category?.name || '-',
      },
      {
        field: 'amount',
        headerName: 'So tien',
        width: 150,
        renderCell: (params) => (
          <Typography
            sx={{ fontWeight: 600, color: params.row.type === 'INCOME' ? 'success.main' : 'error.main' }}
          >
            {params.row.type === 'INCOME' ? '+' : '-'}
            {formatCurrency(params.value)}
          </Typography>
        ),
      },
      {
        field: 'note',
        headerName: 'Ghi chu',
        flex: 1,
        minWidth: 200,
        renderCell: (params) => (
          <Typography noWrap title={params.value || ''}>
            {params.value || '-'}
          </Typography>
        ),
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Thao tac',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Sua"
            onClick={() => onEdit(params.row)}
            color="primary"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon sx={{ color: 'error.main' }} />}
            label="Xoa"
            onClick={() => onDelete(params.row)}
          />,
        ],
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={transactions}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: { sortModel: [{ field: 'date', sort: 'desc' }] },
        }}
        disableRowSelectionOnClick
        sx={{
          bgcolor: 'background.paper',
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />
    </Box>
  );
}
