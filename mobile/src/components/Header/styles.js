import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin-top: 24px;
  height: 58px;
  max-height: 58px;
  justify-content: center;
  position: relative;
  background-color: #006bad;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.5;
  shadow-radius: 2px;
  elevation: 10;
  z-index: 5;
`;

export const ButtonLeft = styled.TouchableOpacity`
  position: absolute;
  left: 12px;
`;

export const Label = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 16px;
`;

export const ButtonRight = styled.TouchableOpacity`
  position: absolute;
  right: 12px;
`;

export const ImgCenter = styled.Image`
  width: 45px;
  height: 45px;
  align-self: center;
`;

export const ImgLeft = styled(ImgCenter)`
  position: absolute;
  right: 12px;
`;
