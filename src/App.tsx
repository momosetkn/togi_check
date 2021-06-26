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
  x: number,
  speedX: number,
  speedY: number,
  speedZ: number,
  distance: number,
  measurementTime: number,
}

function App() {
  const [state, update] = useState<State>({
    orientationAlpha: 0,
    orientationBeta: 0,
    orientationGamma: 0,
    motionX: 0,
    motionY: 0,
    motionZ: 0,
    x: 0,
    speedX: 0,
    speedY: 0,
    speedZ: 0,
    distance: 0,
    measurementTime: new Date().getTime(),
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

      const { measurementTime, speedX, speedY, speedZ } = state;
      const nowMeasurementTime = new Date().getTime();

      const diffTime = nowMeasurementTime - measurementTime;

      const extracted = ({acceleration, speed}:{acceleration: number, speed: number}) => {
        const nowSpeed = (acceleration) * diffTime;
        const nowDistance =  (nowSpeed + speed) * diffTime
        return {nowDistance, nowSpeed};
      }

      const xx = extracted({acceleration: x || 0, speed: speedX});
      const yy = extracted({acceleration: y || 0, speed: speedY});
      const zz = extracted({acceleration: z || 0, speed: speedZ});
      // const calcDistance = (a: number, b: number, c: number) => Math.sqrt(Math.sqrt(a**2 + b**2)**2 + c**2);
      // distance(distanceX, distanceY, distanceZ);
      // x*(diffTime**2)
      const distance = Math.sqrt(Math.sqrt(xx.nowDistance**2 + yy.nowDistance**2)**2 + zz.nowDistance**2);
      update(prev => (
        {
          ...prev,
          motionX: x || 0,
          motionY: y || 0,
          motionZ: z || 0,
          x: prev.x+1,
          speedX: xx.nowSpeed,
          speedY: yy.nowSpeed,
          speedZ: zz.nowSpeed,
          distance: distance,
          measurementTime: nowMeasurementTime,
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
        <tr>
          <td>x</td>
          <td>{state.x}</td>
        </tr>
        <tr>
          <td>speedX</td>
          <td>{state.speedX}</td>
        </tr>
        <tr>
          <td>speedY</td>
          <td>{state.speedY}</td>
        </tr>
        <tr>
          <td>speedZ</td>
          <td>{state.speedZ}</td>
        </tr>
        <tr>
          <td>distance</td>
          <td>{state.distance}</td>
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
