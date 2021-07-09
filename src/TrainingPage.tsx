import React, { useEffect, useState } from 'react';
import './App.css';
import styled from "styled-components";

type MeasurementValue = {
  orientationAlpha: number,
  orientationBeta: number,
  orientationGamma: number,
  accelerationX: number,
  accelerationY: number,
  accelerationZ: number,
  measurementCount: number,// TODO: 要らない
  measurementTime: number,
  diffTime: number,
}

type CalculateValue = {
  speedX: number,
  speedY: number,
  speedZ: number,
  distance: number,
}

export const TrainingPage = () => {
  const [measurementValue, setMeasurementValue] = useState<MeasurementValue>({
    orientationAlpha: 0,
    orientationBeta: 0,
    orientationGamma: 0,
    accelerationX: 0,
    accelerationY: 0,
    accelerationZ: 0,
    measurementCount: 0,
    measurementTime: new Date().getTime(),
    diffTime: 0,
  });

  const [calculateValue, setCalculateValue] = useState<CalculateValue>({
    speedX: 0,
    speedY: 0,
    speedZ: 0,
    distance: 0,
  });

  useEffect(() => {
    window.addEventListener("deviceorientation", (dat) => {
      const {alpha, beta, gamma} = dat;
      setMeasurementValue(prev => (
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

      setMeasurementValue(prev => (
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
      const { accelerationX, accelerationY, accelerationZ, diffTime } = measurementValue;
      const { speedX, speedY, speedZ } = calculateValue;

      const getNowDistanceAndSpeed = ({acceleration, speed}:{acceleration: number, speed: number}) => {
        const additionalSpeed = acceleration * diffTime;
        let nowSpeed = additionalSpeed + speed
        // 加速度が0になったとしても、スピード値が0にならない事象の対処
        // 一定間隔に計測した値を元に積分していっているので、どうしても計算が不正確。
        // 0になったときに、目立つので、0のときに0へ近づけるロジックを入れている。
        const correctionRatio = additionalSpeed === 0 ? 980/1_000 : 1
        nowSpeed = nowSpeed * correctionRatio;
        // スピード値が無視できるぐらい小さな値になったら、いっそのこと0にする
        nowSpeed = nowSpeed < 0.0001 ? 0 : nowSpeed
        const nowDistance =  nowSpeed * diffTime
        return {nowDistance, nowSpeed};
      };


      // 加速度が0だったら、距離も0（スピード計算が正確じゃないため、これを入れないと静止時にスピードが0にならない）
    const { distance, distanceAndSpeedX, distanceAndSpeedY, distanceAndSpeedZ } = (() => {
      // if (accelerationX === 0 && accelerationY === 0 && accelerationZ === 0) {
      //   const DISTANCE_AND_SPEED_ZERO = {nowDistance: 0, nowSpeed: 0}
      //   return {
      //     distance: 0,
      //     distanceAndSpeedX: DISTANCE_AND_SPEED_ZERO,
      //     distanceAndSpeedY: DISTANCE_AND_SPEED_ZERO,
      //     distanceAndSpeedZ: DISTANCE_AND_SPEED_ZERO
      //   };
      // }

      const distanceAndSpeedX = getNowDistanceAndSpeed({acceleration: accelerationX || 0, speed: speedX});
      const distanceAndSpeedY = getNowDistanceAndSpeed({acceleration: accelerationY || 0, speed: speedY});
      const distanceAndSpeedZ = getNowDistanceAndSpeed({acceleration: accelerationZ || 0, speed: speedZ});
      const distance =  Math.sqrt(
        Math.sqrt(distanceAndSpeedX.nowDistance ** 2 + distanceAndSpeedY.nowDistance ** 2) ** 2
        + distanceAndSpeedZ.nowDistance ** 2
      );
      return { distance, distanceAndSpeedX, distanceAndSpeedY, distanceAndSpeedZ };
    })();

    setCalculateValue(prev => (
        {
          ...prev,
          speedX: distanceAndSpeedX.nowSpeed,
          speedY: distanceAndSpeedY.nowSpeed,
          speedZ: distanceAndSpeedZ.nowSpeed,
          distance: prev.distance + distance,
        }));
    // eslint-disable-next-line
  }, [
    measurementValue.accelerationX,
    measurementValue.accelerationY,
    measurementValue.accelerationZ,
    measurementValue.diffTime,
    calculateValue.speedX,
    calculateValue.speedY,
    calculateValue.speedZ,
  ]);

  return (
    <StyledMain>
      <StyledAngleIndicator>
        <span>{Math.abs(measurementValue.orientationGamma).toFixed(1)}度</span>
      </StyledAngleIndicator>
      <table className="value-table">
        <tr>
          <td>orientationAlpha</td>
          <td>{measurementValue.orientationAlpha.toFixed(1)}</td>
        </tr>
        <tr>
          <td>orientationBeta</td>
          <td>{measurementValue.orientationBeta.toFixed(1)}</td>
        </tr>
        <tr>
          <td>orientationGamma</td>
          <td>{measurementValue.orientationGamma.toFixed(1)}</td>
        </tr>
        <tr>
          <td>accelerationX</td>
          <td>{measurementValue.accelerationX.toFixed(1)}</td>
        </tr>
        <tr>
          <td>accelerationY</td>
          <td>{measurementValue.accelerationY.toFixed(1)}</td>
        </tr>
        <tr>
          <td>accelerationZ</td>
          <td>{measurementValue.accelerationZ.toFixed(1)}</td>
        </tr>
        <tr>
          <td>measurementCount</td>
          <td>{measurementValue.measurementCount}</td>
        </tr>
        <tr>
          <td>speedX</td>
          <td>{calculateValue.speedX}</td>
        </tr>
        <tr>
          <td>speedY</td>
          <td>{calculateValue.speedY}</td>
        </tr>
        <tr>
          <td>speedZ</td>
          <td>{calculateValue.speedZ}</td>
        </tr>
        <tr>
          <td>distance</td>
          <td>{(calculateValue.distance/1_000_000).toFixed(2)}</td>
        </tr>
      </table>
    </StyledMain>
  );
}

const StyledMain = styled.div`
  height: 100vh;
  width: 100vw;  
`;

const StyledAngleIndicator = styled.div`
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
