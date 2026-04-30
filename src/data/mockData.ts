import type { Category, Transaction, DashboardSummary, MonthlySummary, CategorySummary } from '../types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Luong', type: 'INCOME', icon: 'AttachMoney', color: '#4caf50', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '2', name: 'Thuong', type: 'INCOME', icon: 'CardGiftcard', color: '#8bc34a', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '3', name: 'Dau tu', type: 'INCOME', icon: 'TrendingUp', color: '#009688', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '4', name: 'An uong', type: 'EXPENSE', icon: 'Restaurant', color: '#f44336', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '5', name: 'Di lai', type: 'EXPENSE', icon: 'DirectionsCar', color: '#ff9800', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '6', name: 'Mua sam', type: 'EXPENSE', icon: 'ShoppingCart', color: '#e91e63', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '7', name: 'Giai tri', type: 'EXPENSE', icon: 'SportsEsports', color: '#9c27b0', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '8', name: 'Hoa don', type: 'EXPENSE', icon: 'Receipt', color: '#3f51b5', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '9', name: 'Suc khoe', type: 'EXPENSE', icon: 'LocalHospital', color: '#00bcd4', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: '10', name: 'Khac', type: 'EXPENSE', icon: 'MoreHoriz', color: '#607d8b', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
];

export const mockTransactions: Transaction[] = [
  { id: '1', amount: 15000000, type: 'INCOME', categoryId: '1', note: 'Luong thang 1', date: '2024-01-25', createdAt: '2024-01-25', updatedAt: '2024-01-25', category: mockCategories[0] },
  { id: '2', amount: 2000000, type: 'INCOME', categoryId: '2', note: 'Thuong Tet', date: '2024-01-28', createdAt: '2024-01-28', updatedAt: '2024-01-28', category: mockCategories[1] },
  { id: '3', amount: 500000, type: 'EXPENSE', categoryId: '4', note: 'An nha hang', date: '2024-01-20', createdAt: '2024-01-20', updatedAt: '2024-01-20', category: mockCategories[3] },
  { id: '4', amount: 300000, type: 'EXPENSE', categoryId: '5', note: 'Xang xe', date: '2024-01-18', createdAt: '2024-01-18', updatedAt: '2024-01-18', category: mockCategories[4] },
  { id: '5', amount: 1500000, type: 'EXPENSE', categoryId: '6', note: 'Mua quan ao', date: '2024-01-15', createdAt: '2024-01-15', updatedAt: '2024-01-15', category: mockCategories[5] },
  { id: '6', amount: 200000, type: 'EXPENSE', categoryId: '7', note: 'Xem phim', date: '2024-01-12', createdAt: '2024-01-12', updatedAt: '2024-01-12', category: mockCategories[6] },
  { id: '7', amount: 3000000, type: 'EXPENSE', categoryId: '8', note: 'Tien dien nuoc', date: '2024-01-10', createdAt: '2024-01-10', updatedAt: '2024-01-10', category: mockCategories[7] },
  { id: '8', amount: 500000, type: 'EXPENSE', categoryId: '9', note: 'Kham benh', date: '2024-01-08', createdAt: '2024-01-08', updatedAt: '2024-01-08', category: mockCategories[8] },
  { id: '9', amount: 5000000, type: 'INCOME', categoryId: '3', note: 'Loi nhuan dau tu', date: '2024-01-05', createdAt: '2024-01-05', updatedAt: '2024-01-05', category: mockCategories[2] },
  { id: '10', amount: 100000, type: 'EXPENSE', categoryId: '10', note: 'Chi phi khac', date: '2024-01-03', createdAt: '2024-01-03', updatedAt: '2024-01-03', category: mockCategories[9] },
];

export const mockDashboardSummary: DashboardSummary = {
  totalBalance: 15900000,
  totalIncome: 22000000,
  totalExpense: 6100000,
  recentTransactions: mockTransactions.slice(0, 5),
};

export const mockMonthlySummary: MonthlySummary[] = [
  { month: '01', year: 2024, income: 22000000, expense: 6100000, balance: 15900000 },
  { month: '02', year: 2024, income: 18000000, expense: 7200000, balance: 10800000 },
  { month: '03', year: 2024, income: 20000000, expense: 8500000, balance: 11500000 },
  { month: '04', year: 2024, income: 19000000, expense: 6800000, balance: 12200000 },
  { month: '05', year: 2024, income: 21000000, expense: 7500000, balance: 13500000 },
  { month: '06', year: 2024, income: 23000000, expense: 9000000, balance: 14000000 },
];

export const mockCategorySummary: CategorySummary[] = [
  { categoryId: '4', categoryName: 'An uong', total: 2500000, percentage: 30, color: '#f44336' },
  { categoryId: '8', categoryName: 'Hoa don', total: 2000000, percentage: 24, color: '#3f51b5' },
  { categoryId: '6', categoryName: 'Mua sam', total: 1500000, percentage: 18, color: '#e91e63' },
  { categoryId: '5', categoryName: 'Di lai', total: 1000000, percentage: 12, color: '#ff9800' },
  { categoryId: '9', categoryName: 'Suc khoe', total: 700000, percentage: 8, color: '#00bcd4' },
  { categoryId: '7', categoryName: 'Giai tri', total: 400000, percentage: 5, color: '#9c27b0' },
  { categoryId: '10', categoryName: 'Khac', total: 250000, percentage: 3, color: '#607d8b' },
];
