import { useMemo } from 'react';
import { useStore } from '../store';
import type { TransactionType } from '../store';
import { formatCurrency } from '../utils';
import { Search, Download, Filter, Plus, Trash2, Edit } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import './Transactions.css';

export const Transactions = () => {
  const { transactions, role, filters, setFilters, deleteTransaction, addTransaction } = useStore();

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch = t.category.toLowerCase().includes(filters.search.toLowerCase()) || 
                          (t.note && t.note.toLowerCase().includes(filters.search.toLowerCase()));
      const matchType = filters.type === 'All' ? true : t.type === filters.type;
      
      // Basic date range logic simulation. Hardcoded 'All' for brevity, 
      // but structurally ready for more.
      
      return matchSearch && matchType;
    });
  }, [transactions, filters]);

  const handleExportCSV = () => {
    const headers = ['Date', 'Amount', 'Type', 'Category', 'Note'];
    const rows = filteredTransactions.map(t => [
      t.date,
      t.amount.toString(),
      t.type,
      t.category,
      t.note || ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSimulateAdd = () => {
    addTransaction({
      date: new Date().toISOString(),
      amount: Math.floor(Math.random() * 500) + 10,
      category: 'Simulated',
      type: Math.random() > 0.5 ? 'Income' : 'Expense',
      note: 'Added via Admin Role'
    });
  };

  return (
    <div className="transactions animate-fade-in">
      <div className="page-header">
        <h1 className="page-title" style={{ marginBottom: 0 }}>Transactions</h1>
        
        <div className="header-actions">
          <button className="btn btn-secondary flex-center-gap" onClick={handleExportCSV}>
            <Download size={16} /> Export CSV
          </button>
          
          {role === 'Admin' && (
            <button className="btn btn-primary flex-center-gap" onClick={handleSimulateAdd}>
              <Plus size={16} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      <div className="card filters-card">
        <div className="filter-group block-search">
          <Search size={18} className="filter-icon" />
          <input 
            type="text" 
            placeholder="Search by category or note..." 
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="filter-input search-input"
          />
        </div>
        
        <div className="filter-group">
          <Filter size={18} className="filter-icon" />
          <select 
            value={filters.type} 
            onChange={(e) => setFilters({ type: e.target.value as TransactionType | 'All' })}
            className="filter-input"
          >
            <option value="All">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="card table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Note</th>
                <th>Type</th>
                <th className="text-right">Amount</th>
                {role === 'Admin' && <th className="text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t) => (
                  <tr key={t.id} className="animate-fade-in">
                    <td>
                      {isValid(parseISO(t.date)) ? format(parseISO(t.date), 'MMM dd, yyyy') : 'Invalid Date'}
                    </td>
                    <td className="font-medium">{t.category}</td>
                    <td className="text-muted">{t.note || '-'}</td>
                    <td>
                      <span className={`badge badge-${t.type.toLowerCase()}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`text-right font-medium ${t.type === 'Income' ? 'text-success' : 'text-danger'}`}>
                      {t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                    {role === 'Admin' && (
                      <td className="text-center action-cell">
                        <button className="icon-btn-small" aria-label="Edit"><Edit size={16}/></button>
                        <button className="icon-btn-small text-danger" onClick={() => deleteTransaction(t.id)} aria-label="Delete">
                          <Trash2 size={16}/>
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={role === 'Admin' ? 6 : 5} className="text-center empty-cell">
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
