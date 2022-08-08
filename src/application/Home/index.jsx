import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar/index';
import { refreshAccessToken } from '../../api/request';
import './index.css';

function Home() {
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      document.body.classList.add('all');
      document.body.setAttribute('theme-mode', 'dark');
    } else {
      document.body.classList.remove('all');
      if (document.body.hasAttribute('theme-mode')) {
        document.body.removeAttribute('theme-mode');
      }
    }
  }, []);

  if (localStorage.getItem('REFRESH_TIME') !== null) {
    let diff = new Date().getTime() - localStorage.getItem('REFRESH_TIME');
    if (diff > 1200000) {
      refreshAccessToken().then((response) => {
        localStorage.setItem('ROOM_JWT_TOKEN_KEY', response.data.accessToken);
        localStorage.setItem('REFRESH_TIME', new Date().getTime());
      });
    }
  }

  let path = useLocation().pathname.split('/')[1];

  return (
    <div className="home_container">
      <Outlet />
      {path === 'houseDetails' ||
      path === 'activity' ||
      path === 'login' ||
      path === 'register' ? null : (
        <NavBar />
      )}
    </div>
  );
}

export default React.memo(Home);
