import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TrainingPage } from './TrainingPage';
import { AnglePage } from "./AnglePage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";
import reportWebVitals from './reportWebVitals';
import { StartPage } from "./StartPage";
import { Graph } from "./Graph";

const ROUTER_BASENAME = '/togi_check';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={ROUTER_BASENAME}>
      <Switch>
        <Route exact path="/">
          <StartPage />
        </Route>
        <Route path="/angle">
          <AnglePage />
        </Route>
        <Route path="/training">
          <TrainingPage />
        </Route>
        <Route path="/graph">
          <Graph items={[{data: [1, 2, 3, 2, 3]}]} length={5} />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
