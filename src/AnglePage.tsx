 import React, { useEffect, useState } from 'react';
import './App.css';
import styled from "styled-components";

export const AnglePage = () => {
  const [orientationGamma, setOrientationGamma] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("deviceorientation", (dat) => {
      setOrientationGamma(dat.gamma || 0);
    });
  }, []);

  return (
    <StyledMain>
      <StyledBackground left={orientationGamma > 0}/>
      <StyledIndicator>
        <span>{Math.abs(orientationGamma).toFixed(1)}度</span>
      </StyledIndicator>
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

