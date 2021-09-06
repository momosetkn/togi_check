import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const StartPage = () => {
  const history = useHistory()
  useEffect(() => {
    const startPath = localStorage.getItem('start_path');
    localStorage.removeItem('start_path');
    if(!startPath) return;

    history.push(startPath);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1>
        StartPage
      </h1>
      <ul>
        <li onClick={() => history.push('/training')}>training</li>
        <li onClick={() => history.push('/angle')}>angle</li>
      </ul>
    </>
  )
}