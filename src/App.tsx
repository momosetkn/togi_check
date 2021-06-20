import React, { useEffect, useState } from 'react';
import './App.css';
import styled from "styled-components";

type State = {
  orientationAlpha: number,
  orientationBeta: number,
  orientationGamma: number,
  motionX: number,
  motionY: number,
  motionZ: number,
}

function App() {
  const [state, update] = useState<State>({
    orientationAlpha: 0,
    orientationBeta: 0,
    orientationGamma: 0,
    motionX: 0,
    motionY: 0,
    motionZ: 0,
  });

  useEffect(() => {
    window.addEventListener("deviceorientation", (dat) => {
      const {alpha, beta, gamma} = dat;
      update(prev => (
        {
          ...prev,
          orientationAlpha: alpha || 0,
          orientationBeta: beta || 0,
          orientationGamma: gamma || 0,
        }));
    });
    window.addEventListener("devicemotion", (dat) => {
      if (!dat.acceleration) return;
      const {x, y, z} = dat.acceleration;
      update(prev => (
        {
          ...prev,
          motionX: x || 0,
          motionY: y || 0,
          motionZ: z || 0,
        }));
    });
  }, []);

  return (
    <StyledMain>
      <StyledBackground left={state.orientationGamma > 0}/>
      <StyledIndicator>
        <span>{Math.abs(state.orientationGamma).toFixed(1)}度</span>
      </StyledIndicator>
      <table className="value-table">
        <tr>
          <td>orientationAlpha</td>
          <td>{state.orientationAlpha.toFixed(1)}</td>
        </tr>
        <tr>
          <td>orientationBeta</td>
          <td>{state.orientationBeta.toFixed(1)}</td>
        </tr>
        <tr>
          <td>orientationGamma</td>
          <td>{state.orientationGamma.toFixed(1)}</td>
        </tr>
        <tr>
          <td>motionX</td>
          <td>{state.motionX.toFixed(1)}</td>
        </tr>
        <tr>
          <td>motionY</td>
          <td>{state.motionY.toFixed(1)}</td>
        </tr>
        <tr>
          <td>motionZ</td>
          <td>{state.motionZ.toFixed(1)}</td>
        </tr>
      </table>
    </StyledMain>
  );
}

const StyledMain = styled.div`
  height: 100vh;
  width: 100vw;  
`;

const StyledBackground = styled.div<{left: boolean}>`
  height: 100vh;
  width: 100vw;
  z-index: -1;
  position: absolute;
  background-image: url("${process.env.PUBLIC_URL}/hocho.jpg");
  transform: scale(${({left}) => left ? "1" : "-1"}, 1);
`;

const StyledIndicator = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    background: #00000090;
    color: #ffffff;
    font-size: 10vw;
  }
`;

export default App;
