import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Button,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/format';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Giao dich gan day
          </Typography>
          <Button
            size="small"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/transactions')}
          >
            Xem tat ca
          </Button>
        </Box>
        <List disablePadding>
          {transactions.map((transaction, index) => (
            <ListItem
              key={transaction.id}
              disablePadding
              sx={{
                py: 1.5,
                borderBottom: index < transactions.length - 1 ? 1 : 0,
                borderColor: 'divider',
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {transaction.category?.name || 'Khong co danh muc'}
                    </Typography>
                    <Chip
                      label={transaction.type === 'INCOME' ? 'Thu' : 'Chi'}
                      size="small"
                      color={transaction.type === 'INCOME' ? 'success' : 'error'}
                      sx={{ height: 20, fontSize: 11 }}
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(transaction.date)}
                    {transaction.note && ` - ${transaction.note}`}
                  </Typography>
                }
              />
              <Typography
                variant="body1"
                fontWeight={600}
                color={transaction.type === 'INCOME' ? 'success.main' : 'error.main'}
              >
                {transaction.type === 'INCOME' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
