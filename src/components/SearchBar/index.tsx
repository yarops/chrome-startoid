import React, { useState } from 'react';
import styles from './SearchBar.module.scss';

function Index() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      // Проверяем, является ли запрос URL
      if (query.includes('.') && !query.includes(' ')) {
        window.location.href = query.startsWith('http') ? query : `https://${query}`;
      } else {
        // Поиск в Google
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск в Google или введите URL"
          className={styles.searchInput}
          autoFocus
        />
        <button type="submit" className={styles.searchButton}>
          🔍
        </button>
      </form>
    </div>
  );
}

export default Index;