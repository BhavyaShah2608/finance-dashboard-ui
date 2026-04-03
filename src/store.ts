import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'Viewer' | 'Admin';
export type TransactionType = 'Income' | 'Expense';

export interface Transaction {
  id: string;
  date: string; // ISO string
  amount: number;
  category: string;
  type: TransactionType;
  note?: string;
}

export interface Filters {
  search: string;
  type: 'All' | TransactionType;
  category: string;
  dateRange: 'All' | 'This Month' | 'Last Month' | 'This Year';
}

interface DashboardState {
  role: Role;
  transactions: Transaction[];
  theme: 'dark' | 'light';
  filters: Filters;
  
  // Actions
  setRole: (role: Role) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetAll: () => void;
}

const initialTransactions: Transaction[] = [
  { id: '1', date: new Date().toISOString(), amount: 4200, category: 'Salary', type: 'Income', note: 'Monthly Salary' },
  { id: '2', date: new Date(Date.now() - 86400000).toISOString(), amount: 35.5, category: 'Food', type: 'Expense', note: 'Lunch Cafe' },
  { id: '3', date: new Date(Date.now() - 86400000 * 2).toISOString(), amount: 85, category: 'Utilities', type: 'Expense', note: 'Electricity Bill' },
  { id: '4', date: new Date(Date.now() - 86400000 * 5).toISOString(), amount: 150, category: 'Entertainment', type: 'Expense', note: 'Concert Tickets' },
  { id: '5', date: new Date(Date.now() - 86400000 * 10).toISOString(), amount: 300, category: 'Freelance', type: 'Income', note: 'Web Design Project' },
  { id: '6', date: new Date(Date.now() - 86400000 * 15).toISOString(), amount: 820, category: 'Rent', type: 'Expense', note: 'Monthly Rent' },
  { id: '7', date: new Date(Date.now() - 86400000 * 20).toISOString(), amount: 120, category: 'Transport', type: 'Expense', note: 'Train Pass' },
];

export const useStore = create<DashboardState>()(
  persist(
    (set) => ({
      role: 'Admin',
      transactions: initialTransactions,
      theme: 'dark', // Defaulting to dark as per premium tech constraints
      filters: {
        search: '',
        type: 'All',
        category: 'All',
        dateRange: 'All',
      },

      setRole: (role) => set({ role }),
      setTheme: (theme) => set({ theme }),
      addTransaction: (transaction) => set((state) => ({
        transactions: [{ ...transaction, id: Math.random().toString(36).substring(2, 9) }, ...state.transactions],
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id),
      })),
      updateTransaction: (id, updated) => set((state) => ({
        transactions: state.transactions.map(t => t.id === id ? { ...t, ...updated } : t),
      })),
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters },
      })),
      resetAll: () => set({ transactions: initialTransactions }),
    }),
    {
      name: 'finance-dashboard-storage-v2',
    }
  )
);
