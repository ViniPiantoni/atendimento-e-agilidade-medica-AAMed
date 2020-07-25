import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-content: space-between;
  justify-content: center;
  flex-wrap: wrap;

  img {
    animation: 0.6s ${fadeIn} ease-in;
    width: 550px;
  }

  hr {
    width: 80%;
  }
`;
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    color: #ccc;
    margin-left: 15%;
  }
  img {
    width: 250px;
  }
`;

export const CustomLine = styled.div`
  width: 80%;
  max-width: 100%;
  height: 1px;
  margin: 35px auto 0 auto;
  background-color: #ccc;
`;

export const ListInfo = styled.div`
  max-width: 100%;
  width: 900px;
  margin: 35px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  animation: 0.6s ${fadeIn} ease-in;
`;
export const Card = styled.div`
  height: 80%;
  width: 250px;
  padding: 22px 8px;
  background: linear-gradient(152deg, #3eb6f7, #64c5fa);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 4px 8px #0d96e0;
  margin: 10px 10px;
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    transform: scale(1.2);
  }

  img {
    margin: 12px 0;
    width: 80%;
  }

  h2 {
    color: #24334e;
    margin: 12px 0;
    font-size: 2rem;
  }

  span {
    color: #fff;
  }
`;
export const InstallApp = styled.div`
  width: 900px;
  max-width: 100%;
  margin: 35px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  animation: 0.6s ${fadeIn} ease-in;
`;
export const Store = styled.div`
  cursor: pointer;
  width: 300px;
  margin: 0 auto;
  max-width: 100%;

  img {
    width: 50px;
    display: block;
  }
`;
