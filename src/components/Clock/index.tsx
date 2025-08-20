import { useState, useEffect } from 'react';
import styles from './Clock.module.scss';

// Типизация для Chrome Identity API
interface ChromeUserInfo {
  email: string;
  id: string;
}

function Index() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    let storedUserName = localStorage.getItem('userName');

    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Проверяем доступность Chrome API
    if (typeof chrome !== 'undefined' && chrome.identity && chrome.identity.getProfileUserInfo) {
      chrome.identity.getProfileUserInfo((userInfo: ChromeUserInfo) => {
        if (userInfo && userInfo.email) {
          console.log('User email:', userInfo.email);
          // Извлекаем имя из email (до символа @)
          const emailName = userInfo.email.split('@')[0];
          if (!storedUserName) {
            setUserName(emailName);
            localStorage.setItem('userName', emailName);
          }
        }
      });
    }
  }, []);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.clock}>
      <div className={styles.time}>{formatTime(time)}</div>
      <div className={styles.date}>{formatDate(time)}</div>
      <h1 className="greeting">Hi, {userName}!</h1>
    </div>
  );
}

export default Index;