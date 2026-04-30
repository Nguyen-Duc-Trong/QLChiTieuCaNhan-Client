import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Category, TransactionType } from '../../types';

interface CategoryListProps {
  title: string;
  type: TransactionType;
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryList({
  title,
  type,
  categories,
  onEdit,
  onDelete,
}: CategoryListProps) {
  const filteredCategories = categories.filter((cat) => cat.type === type);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Chip
            label={filteredCategories.length}
            size="small"
            color={type === 'INCOME' ? 'success' : 'error'}
          />
        </Box>
        <List disablePadding>
          {filteredCategories.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
              Chua co danh muc nao
            </Typography>
          ) : (
            filteredCategories.map((category, index) => (
              <ListItem
                key={category.id}
                disablePadding
                sx={{
                  py: 1.5,
                  borderBottom: index < filteredCategories.length - 1 ? 1 : 0,
                  borderColor: 'divider',
                }}
                secondaryAction={
                  <Box>
                    <IconButton size="small" color="primary" onClick={() => onEdit(category)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => onDelete(category)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: 1,
                    bgcolor: category.color || '#757575',
                    mr: 2,
                  }}
                />
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
}
