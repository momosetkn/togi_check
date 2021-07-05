import React, { useEffect, useState } from 'react';
import './App.css';
import { useHistory } from 'react-router-dom';

export const StartPage = () => {
  const history = useHistory()
  useEffect(() => {
    const startPath = localStorage.getItem('start_path');
    localStorage.removeItem('start_path');
    if(!startPath) return;

    history.push(startPath);
  }, []);

  return (
    <h1>
      StartPage
    </h1>
  )
}