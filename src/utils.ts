import type { Transaction } from './store';
import { format, parseISO, isValid } from 'date-fns';

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getSummary = (transactions: Transaction[]) => {
  const income = transactions.filter(t => t.type === 'Income').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.type === 'Expense').reduce((acc, curr) => acc + curr.amount, 0);
  return {
    income,
    expense,
    balance: income - expense
  };
};

export const getCategoryData = (transactions: Transaction[]) => {
  const expenseTransactions = transactions.filter(t => t.type === 'Expense');
  const catMap = expenseTransactions.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = 0;
    acc[curr.category] += curr.amount;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(catMap).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
};

export const getTrendData = (transactions: Transaction[]) => {
  // Simple grouping by Month-Year (e.g., "Jan 2024")
  const map: Record<string, { income: number, expense: number }> = {};
  
  // Sort oldest to newest
  const sorted = [...transactions].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sorted.forEach(t => {
    const d = parseISO(t.date);
    if (!isValid(d)) return;
    const month = format(d, 'MMM yyyy');
    if (!map[month]) map[month] = { income: 0, expense: 0 };
    
    if (t.type === 'Income') map[month].income += t.amount;
    else map[month].expense += t.amount;
  });

  return Object.entries(map).map(([date, data]) => ({
    date,
    income: data.income,
    expense: data.expense
  }));
};
