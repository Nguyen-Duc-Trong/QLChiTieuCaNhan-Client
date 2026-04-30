import { useState, useCallback } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CategoryList from '../../components/categories/CategoryList';
import CategoryForm from '../../components/forms/CategoryForm';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import type { Category } from '../../types';
import type { CategoryFormData } from '../../schemas/category';
import { mockCategories } from '../../data/mockData';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAdd = () => {
    setSelectedCategory(null);
    setFormOpen(true);
  };

  const handleEdit = useCallback((category: Category) => {
    setSelectedCategory(category);
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback((category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  }, []);

  const handleFormSubmit = (data: CategoryFormData) => {
    if (selectedCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === selectedCategory.id
            ? { ...c, ...data, updatedAt: new Date().toISOString() }
            : c
        )
      );
    } else {
      const newCategory: Category = {
        id: String(Date.now()),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCategories((prev) => [...prev, newCategory]);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedCategory) {
      setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));
    }
    setDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
            Danh muc
          </Typography>
          <Typography color="text.secondary">
            Quan ly cac danh muc thu nhap va chi tieu
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Them danh muc
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CategoryList
            title="Thu nhap"
            type="INCOME"
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CategoryList
            title="Chi tieu"
            type="EXPENSE"
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Grid>
      </Grid>

      <CategoryForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        category={selectedCategory}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="Ban co chac chan muon xoa danh muc nay? Cac giao dich lien quan se khong con hien thi danh muc."
      />
    </Box>
  );
}
