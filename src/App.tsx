import React, { useEffect, useState } from 'react';
import './App.css';
import styled from "styled-components";

type State = {
  orientationAlpha: number,
  orientationBeta: number,
  orientationGamma: number,
  accelerationX: number,
  accelerationY: number,
  accelerationZ: number,
  measurementCount: number,// TODO: 要らない
  speedX: number,
  speedY: number,
  speedZ: number,
  distance: number,
  measurementTime: number,
  diffTime: number,
}

function App() {
  const [state, update] = useState<State>({
    orientationAlpha: 0,
    orientationBeta: 0,
    orientationGamma: 0,
    accelerationX: 0,
    accelerationY: 0,
    accelerationZ: 0,
    measurementCount: 0,
    speedX: 0,
    speedY: 0,
    speedZ: 0,
    distance: 0,
    measurementTime: new Date().getTime(),
    diffTime: 0,
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
      const { x, y, z } = dat.acceleration;

      const nowMeasurementTime = new Date().getTime();

      update(prev => (
        {
          ...prev,
          accelerationX: x || 0,
          accelerationY: y || 0,
          accelerationZ: z || 0,
          measurementCount: prev.measurementCount+1,
          measurementTime: nowMeasurementTime,
          diffTime: nowMeasurementTime - prev.measurementTime,
        }));
    });
  }, []);

  useEffect(() => {
      const { accelerationX, accelerationY, accelerationZ, speedX, speedY, speedZ, diffTime } = state;

      const getNowDistanceAndSpeed = ({acceleration, speed}:{acceleration: number, speed: number}) => {
        const additionalSpeed = acceleration * diffTime;
        const nowSpeed = additionalSpeed + speed
        const nowDistance =  nowSpeed * diffTime
        return {nowDistance, nowSpeed};
      };

    const getDistance = ({
       accelerationX,
       accelerationY,
       accelerationZ,
       speedX,
       speedY,
       speedZ
    }: {
      accelerationX: number,
      accelerationY: number,
      accelerationZ: number,
      speedX: number,
      speedY: number,
      speedZ: number
    }) => {
      // 加速度が0だったら、距離も0（スピード計算が正確じゃないため、これを入れないと静止時にスピードが0にならない）
      if (accelerationX === 0 && accelerationY === 0 && accelerationZ === 0) {
        return 0;
      }

      const xx = getNowDistanceAndSpeed({acceleration: accelerationX || 0, speed: speedX});
      const yy = getNowDistanceAndSpeed({acceleration: accelerationY || 0, speed: speedY});
      const zz = getNowDistanceAndSpeed({acceleration: accelerationZ || 0, speed: speedZ});
      return Math.sqrt(Math.sqrt(xx.nowDistance ** 2 + yy.nowDistance ** 2) ** 2 + zz.nowDistance ** 2);
    };

    const distance = getDistance({
      accelerationX,
      accelerationY,
      accelerationZ,
      speedX,
      speedY,
      speedZ
    });
    update(prev => (
        {
          ...prev,
          speedX: xx.nowSpeed,
          speedY: yy.nowSpeed,
          speedZ: zz.nowSpeed,
          distance: prev.distance + distance,
        }));
    // eslint-disable-next-line
  }, [
    state.accelerationX,
    state.accelerationY,
    state.accelerationZ,
    state.speedX,
    state.speedY,
    state.speedZ,
    state.diffTime,
  ]);

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
          <td>{state.accelerationX.toFixed(1)}</td>
        </tr>
        <tr>
          <td>motionY</td>
          <td>{state.accelerationY.toFixed(1)}</td>
        </tr>
        <tr>
          <td>motionZ</td>
          <td>{state.accelerationZ.toFixed(1)}</td>
        </tr>
        <tr>
          <td>x</td>
          <td>{state.measurementCount}</td>
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
          <td>{state.distance/1_000}</td>
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
