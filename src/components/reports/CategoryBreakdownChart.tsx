import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import type { CategorySummary } from '../../types';
import { formatCurrency } from '../../utils/format';

interface CategoryBreakdownChartProps {
  data: CategorySummary[];
}

export default function CategoryBreakdownChart({ data }: CategoryBreakdownChartProps) {
  const maxValue = Math.max(...data.map((item) => item.total));

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          Chi tieu theo danh muc
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data.map((item) => (
            <Box key={item.categoryId}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item.categoryName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatCurrency(item.total)} ({item.percentage}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(item.total / maxValue) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: item.color,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
