import React from 'react';
import styled from "styled-components";

export const ProgressBar = ({now}: {now: number}) => {
  return (
    <StyledMain>
      <StyledAllProgress>
        <StyledProgress ratio={now}/>
      </StyledAllProgress>
    </StyledMain>
  );
}

const borderRadius = '4px';

const StyledMain = styled.div`
  width: 100%;
  height: 15px;
`;

const StyledAllProgress = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${borderRadius};
  background-color: #e9ecef;
`;

const StyledProgress = styled.div<{ratio: number}>`
  width: ${({ratio}) => ratio}%; 
  height: 100%;
  animation-delay: 250ms;
  background-color: #007bff;
  border-top-left-radius: ${borderRadius};
  border-bottom-left-radius: ${borderRadius};
`;
