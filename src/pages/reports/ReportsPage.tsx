import { Box, Typography, Grid } from '@mui/material';
import MonthlySummaryTable from '../../components/reports/MonthlySummaryTable';
import CategoryBreakdownChart from '../../components/reports/CategoryBreakdownChart';
import TrendChart from '../../components/reports/TrendChart';
import { mockMonthlySummary, mockCategorySummary } from '../../data/mockData';

export default function ReportsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
        Bao cao
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Phan tich chi tiet tai chinh cua ban
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <MonthlySummaryTable data={mockMonthlySummary} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CategoryBreakdownChart data={mockCategorySummary} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TrendChart data={mockMonthlySummary} />
        </Grid>
      </Grid>
    </Box>
  );
}
