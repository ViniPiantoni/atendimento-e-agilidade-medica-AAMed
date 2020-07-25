import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #006bad;
  border-radius: 2px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.5;
  shadow-radius: 2px;
  elevation: 5;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
