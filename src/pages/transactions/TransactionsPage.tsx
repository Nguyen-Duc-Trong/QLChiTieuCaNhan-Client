import { useState, useMemo, useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TransactionTable from '../../components/transactions/TransactionTable';
import TransactionForm from '../../components/forms/TransactionForm';
import TransactionFilter from '../../components/forms/TransactionFilter';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import type { Transaction, TransactionFilter as FilterType } from '../../types';
import type { TransactionFormData } from '../../schemas/transaction';
import { mockTransactions, mockCategories } from '../../data/mockData';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filter, setFilter] = useState<FilterType>({});
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (filter.type && t.type !== filter.type) return false;
      if (filter.categoryId && t.categoryId !== filter.categoryId) return false;
      if (filter.startDate && t.date < filter.startDate) return false;
      if (filter.endDate && t.date > filter.endDate) return false;
      if (filter.search) {
        const search = filter.search.toLowerCase();
        const matchNote = t.note?.toLowerCase().includes(search);
        const matchCategory = t.category?.name.toLowerCase().includes(search);
        if (!matchNote && !matchCategory) return false;
      }
      return true;
    });
  }, [transactions, filter]);

  const handleAdd = () => {
    setSelectedTransaction(null);
    setFormOpen(true);
  };

  const handleEdit = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDeleteDialogOpen(true);
  }, []);

  const handleFormSubmit = (data: TransactionFormData) => {
    const category = mockCategories.find((c) => c.id === data.categoryId);

    if (selectedTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === selectedTransaction.id
            ? {
                ...t,
                ...data,
                category,
                updatedAt: new Date().toISOString(),
              }
            : t
        )
      );
    } else {
      const newTransaction: Transaction = {
        id: String(Date.now()),
        ...data,
        category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedTransaction) {
      setTransactions((prev) => prev.filter((t) => t.id !== selectedTransaction.id));
    }
    setDeleteDialogOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Giao dich
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Them giao dich
        </Button>
      </Box>

      <TransactionFilter filter={filter} onFilterChange={setFilter} />

      <TransactionTable
        transactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TransactionForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        transaction={selectedTransaction}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="Ban co chac chan muon xoa giao dich nay?"
      />
    </Box>
  );
}
