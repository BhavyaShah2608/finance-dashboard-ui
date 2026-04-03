import { useStore } from '../store';
import { getSummary, getCategoryData, getTrendData, formatCurrency } from '../utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Award } from 'lucide-react';
import './Dashboard.css';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const Dashboard = () => {
  const transactions = useStore(state => state.transactions);
  
  const { income, expense, balance } = getSummary(transactions);
  const categoryData = getCategoryData(transactions);
  const trendData = getTrendData(transactions);
  
  const topCategory = categoryData.length > 0 ? categoryData[0] : null;

  return (
    <div className="dashboard animate-fade-in">
      <h1 className="page-title">Dashboard Overview</h1>

      <div className="summary-grid">
        <div className="card summary-card">
          <div className="summary-icon bg-blue"><DollarSign size={24} /></div>
          <div className="summary-info">
            <span className="summary-label">Total Balance</span>
            <span className="summary-value" style={{color: balance < 0 ? 'var(--danger)' : 'var(--text-primary)'}}>{formatCurrency(balance)}</span>
          </div>
        </div>
        <div className="card summary-card">
          <div className="summary-icon bg-green"><TrendingUp size={24} /></div>
          <div className="summary-info">
            <span className="summary-label">Total Income</span>
            <span className="summary-value" style={{color: 'var(--success)'}}>{formatCurrency(income)}</span>
          </div>
        </div>
        <div className="card summary-card">
          <div className="summary-icon bg-red"><TrendingDown size={24} /></div>
          <div className="summary-info">
            <span className="summary-label">Total Expenses</span>
            <span className="summary-value" style={{color: 'var(--danger)'}}>{formatCurrency(expense)}</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="card chart-card main-chart">
          <h3 className="card-title">Cash Flow Trend</h3>
          <div className="chart-container">
            {trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--success)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--danger)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Area type="monotone" dataKey="income" name="Income" stroke="var(--success)" fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="expense" name="Expense" stroke="var(--danger)" fillOpacity={1} fill="url(#colorExpense)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
                <div className="empty-state">No trend data available</div>
            )}
          </div>
        </div>

        <div className="dashboard-side-col">
          <div className="card chart-card">
            <h3 className="card-title">Spending Breakdown</h3>
            <div className="chart-container">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                        itemStyle={{ color: 'var(--text-primary)' }}
                        formatter={(value: any) => formatCurrency(value)}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="empty-state">No expense data available</div>
              )}
            </div>
          </div>

          <div className="card insights-card">
            <h3 className="card-title flex-center-gap">
              <Award size={18} style={{color: 'var(--warning)'}}/> Key Insights
            </h3>
            {topCategory ? (
              <div className="insight-item">
                <span className="insight-label">Highest Spending Category</span>
                <span className="insight-value">{topCategory.name} - {formatCurrency(topCategory.value)}</span>
              </div>
            ) : (
              <div className="empty-state-small">More data needed for insights</div>
            )}
            <div className="insight-item">
              <span className="insight-label">Financial Health</span>
              <span className="insight-value" style={{ color: balance >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                {balance >= 0 ? 'Positive Cash Flow' : 'Negative Cash Flow'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
