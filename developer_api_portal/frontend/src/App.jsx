/**
 * ============================================================================
 * APP ROOT COMPONENT
 * ============================================================================
 * Top-level component. Composes the Header and Dashboard.
 * Acts as the layout shell for the entire application.
 */

import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
    return (
        <div className="app">
            <Header />
            <Dashboard />
        </div>
    );
};

export default App;
