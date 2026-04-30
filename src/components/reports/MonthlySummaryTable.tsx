import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import type { MonthlySummary } from '../../types';
import { formatCurrency } from '../../utils/format';

interface MonthlySummaryTableProps {
  data: MonthlySummary[];
}

export default function MonthlySummaryTable({ data }: MonthlySummaryTableProps) {
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);
  const totalBalance = totalIncome - totalExpense;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          Tong hop theo thang
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Thang</TableCell>
                <TableCell align="right">Thu nhap</TableCell>
                <TableCell align="right">Chi tieu</TableCell>
                <TableCell align="right">So du</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={`${row.year}-${row.month}`}>
                  <TableCell>
                    {row.month}/{row.year}
                  </TableCell>
                  <TableCell align="right" sx={{ color: 'success.main', fontWeight: 500 }}>
                    {formatCurrency(row.income)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: 'error.main', fontWeight: 500 }}>
                    {formatCurrency(row.expense)}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: row.balance >= 0 ? 'success.main' : 'error.main',
                      fontWeight: 600,
                    }}
                  >
                    {formatCurrency(row.balance)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 700 }}>Tong cong</TableCell>
                <TableCell align="right" sx={{ color: 'success.main', fontWeight: 700 }}>
                  {formatCurrency(totalIncome)}
                </TableCell>
                <TableCell align="right" sx={{ color: 'error.main', fontWeight: 700 }}>
                  {formatCurrency(totalExpense)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: totalBalance >= 0 ? 'success.main' : 'error.main',
                    fontWeight: 700,
                  }}
                >
                  {formatCurrency(totalBalance)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
