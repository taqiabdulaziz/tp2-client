import React, { useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import useUserStore from '../../repository/user.store';

function HomePage() {
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const onIdle = () => {
    navigate('/login', { replace: true });
    logout();
  };

  const { start } = useIdleTimer({
    timeout: 1000 * 30,
    onIdle,
  });

  useEffect(() => {
    start();
  }, []);

  return (
    <div className={styles.homepage}>
      <h2>Succesfully Login!</h2>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          navigate('/login', { replace: true });
          logout();
        }}
      >
        Logout

      </button>
    </div>
  );
}

export default HomePage;
