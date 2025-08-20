import SearchBar from './components/SearchBar';
import QuickLinks from './components/QuickLinks';
import Clock from './components/Clock';

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

        </aside>
      </div>
    </div>
  );
}

export default App;