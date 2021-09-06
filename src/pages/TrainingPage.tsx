import React, {useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import { ProgressBar } from "../components/ProgressBar";
import { Graph, Item as GraphItem } from "../components/Graph";
import {average, equallyDividedSlice} from "../utils/math";

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

type Angle = { alpha: number, beta: number, gamma: number };

const samplingMaxCount = 1000;

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

  const [state, update] = useState<{angles: Angle[], status: 'waiting' | 'doing' | 'finished'}>({
    angles: [],
    status: 'waiting'
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
    const { additionalDistance, nowSpeedX, nowSpeedY, nowSpeedZ } = (() => {
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
      const additionalDistance =  Math.sqrt(
        Math.sqrt(distanceAndSpeedX.nowDistance ** 2 + distanceAndSpeedY.nowDistance ** 2) ** 2
        + distanceAndSpeedZ.nowDistance ** 2
      );
      return { additionalDistance, nowSpeedX: distanceAndSpeedX.nowSpeed, nowSpeedY: distanceAndSpeedY.nowSpeed, nowSpeedZ: distanceAndSpeedZ.nowSpeed };
    })();

    setCalculateValue(prev => (
        {
          ...prev,
          speedX: nowSpeedX,
          speedY: nowSpeedY,
          speedZ: nowSpeedZ,
          distance: prev.distance + additionalDistance,
        }));
    // eslint-disable-next-line
  }, [
    measurementValue.accelerationX,
    measurementValue.accelerationY,
    measurementValue.accelerationZ,
    measurementValue.diffTime,
  ]);

  const now = Math.min(calculateValue.distance/500_00, samplingMaxCount);

  useEffect(() => {
    let status = state.status;
    if(now === samplingMaxCount){
      navigator.vibrate(200);
      status = 'finished'
    }
    const angles = [...state.angles, {
      alpha: measurementValue.orientationAlpha,
      beta: measurementValue.orientationBeta,
      gamma: measurementValue.orientationGamma,
    }];
    update(prev => (
      {
        ...prev,
        status,
        angles,
      }));
    // eslint-disable-next-line
  }, [now]);

  return (
    <StyledMain>
      {state.status === 'waiting' ? (
        <button onClick={() => {
          // document.body.requestFullscreen();
          update(prev => ({...prev, status: 'doing'}))
        }}>
          スタート
        </button>
      ) : state.status === 'doing' ? (
          <>
            <StyledAngleIndicator>
              <span>{Math.abs(measurementValue.orientationGamma).toFixed(1)}度</span>
            </StyledAngleIndicator>
            <StyledProgressBarContainer>
              <ProgressBar now={now / 10}/>
            </StyledProgressBarContainer>
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
                <td>{(calculateValue.distance / 1_000_000).toFixed(2)}</td>
              </tr>
              <tr>
                <td>now</td>
                <td>{now}</td>
              </tr>
            </table>
          </>
        ) :
        <Result angles={state.angles} />
      }
    </StyledMain>
  );
}

const Result = ({angles}:{angles: Angle[]}) => {
  const alphaAngles = useMemo(() => angles.map(x => x.alpha), [angles]);
  const betaAngles = useMemo(() => angles.map(x => x.beta), [angles]);
  const gammaAngles = useMemo(() => angles.map(x => x.gamma), [angles]);

  const sliceLength = 10;
  const graphItems: GraphItem[] = [
    {
      title: 'alpha',
      data: equallyDividedSlice(alphaAngles, sliceLength).map(average),
    },
    {
      title: 'beta',
      data: equallyDividedSlice(betaAngles, sliceLength).map(average),
    },
    {
      title: 'gamma',
      data: equallyDividedSlice(gammaAngles, sliceLength).map(average),
    },
  ];

  const wobbleValues = useMemo(() => {
    const getWobble = (items: number[]) => {
      const avg = average(items);
      return items.map(x => Math.abs(x - avg));
    }

    return [
      {
        title: 'alpha',
        data: getWobble(alphaAngles),
      },
      {
        title: 'beta',
        data: getWobble(betaAngles),
      },
      {
        title: 'gamma',
        data: getWobble(gammaAngles),
      },
    ];
  }, [alphaAngles,
    betaAngles,
    gammaAngles]);

  return (
    <>
      <Graph items={graphItems} length={samplingMaxCount/sliceLength} />
      {wobbleValues.map(wobbleValue => (
        <>
          <div>{wobbleValue.title}</div>
          <div>{wobbleValue.data}</div>
        </>
      ))}
    </>
  )
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

const StyledProgressBarContainer = styled.div`
  padding: 0 32px;
`;