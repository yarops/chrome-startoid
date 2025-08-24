import SearchBar from './components/SearchBar';
import QuickLinks from './components/QuickLinks';
import Clock from './components/Clock';
import TopSites from '@/components/TopSites';

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <Clock />
          <SearchBar />
        </header>
        
        <main className="main">
          <QuickLinks />
        </main>
        
        <aside className="sidebar">
          <TopSites />
        </aside>
      </div>
    </div>
  );
}

export default App;