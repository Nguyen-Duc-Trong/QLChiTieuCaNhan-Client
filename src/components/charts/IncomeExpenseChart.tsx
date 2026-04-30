import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { MonthlySummary } from '../../types';
import { formatCurrency } from '../../utils/format';

interface IncomeExpenseChartProps {
  data: MonthlySummary[];
}

export default function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
  const chartData = data.map((item) => ({
    name: `T${item.month}`,
    'Thu nhap': item.income,
    'Chi tieu': item.expense,
  }));

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          Thu nhap va Chi tieu theo thang
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fill: '#757575' }} />
              <YAxis
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                tick={{ fill: '#757575' }}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                }}
              />
              <Legend />
              <Bar dataKey="Thu nhap" fill="#2e7d32" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Chi tieu" fill="#d32f2f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
