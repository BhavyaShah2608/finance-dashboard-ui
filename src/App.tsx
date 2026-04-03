import { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';

function App() {
  const [currentPath, setCurrentPath] = useState('dashboard');

  return (
    <Layout currentPath={currentPath} onNavigate={setCurrentPath}>
      {currentPath === 'dashboard' && <Dashboard />}
      {currentPath === 'transactions' && <Transactions />}
    </Layout>
  );
}

export default App;
