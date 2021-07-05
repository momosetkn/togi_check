import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TrainingPage } from './TrainingPage';
import { AnglePage } from "./AnglePage";
import { BrowserRouter, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/angle">
        <AnglePage />
      </Route>
      <Route path="/training">
        <TrainingPage />
      </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
