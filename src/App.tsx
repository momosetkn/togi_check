import React, { useEffect, useState } from 'react';
import './App.css';

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
      if (!dat.accelerationIncludingGravity) return;
      const {x, y, z} = dat.accelerationIncludingGravity;
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
    <div className="App">
      {JSON.stringify(state)}
    </div>
  );
}

export default App;
