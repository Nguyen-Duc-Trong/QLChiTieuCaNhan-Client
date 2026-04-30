import { Box, Typography, Grid } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SummaryCard from '../../components/dashboard/SummaryCard';
import ExpenseChart from '../../components/charts/ExpenseChart';
import IncomeExpenseChart from '../../components/charts/IncomeExpenseChart';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import { mockDashboardSummary, mockCategorySummary, mockMonthlySummary } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';

export default function DashboardPage() {
  const { totalBalance, totalIncome, totalExpense, recentTransactions } = mockDashboardSummary;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
        Dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Tong quan tai chinh cua ban
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            title="So du"
            value={formatCurrency(totalBalance)}
            icon={<AccountBalanceWalletIcon />}
            color="#1976d2"
            bgcolor="rgba(25, 118, 210, 0.1)"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            title="Thu nhap"
            value={formatCurrency(totalIncome)}
            icon={<TrendingUpIcon />}
            color="#2e7d32"
            bgcolor="rgba(46, 125, 50, 0.1)"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            title="Chi tieu"
            value={formatCurrency(totalExpense)}
            icon={<TrendingDownIcon />}
            color="#d32f2f"
            bgcolor="rgba(211, 47, 47, 0.1)"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ExpenseChart data={mockCategorySummary} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <IncomeExpenseChart data={mockMonthlySummary} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <RecentTransactions transactions={recentTransactions} />
        </Grid>
      </Grid>
    </Box>
  );
}
