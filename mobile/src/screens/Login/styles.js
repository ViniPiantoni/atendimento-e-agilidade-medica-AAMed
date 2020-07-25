import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export const ImageContainer = styled.View`
  flex: 0.7;
  align-items: center;
  justify-content: center;
  background-color: #2f900000;
`;

export const Image = styled.Image`
  width: 130px;
  height: 130px;
`;

export const LoginBox = styled.View`
  flex: 1.25;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #778beb00;
  justify-content: flex-start;
`;

export const InputBox = styled.View`
  background-color: #59627500;
`;

export const Label = styled.Text`
  align-self: flex-start;
  color: #006bad;
  font-size: 14px;
`;

export const InputMask = styled(TextInputMask)`
  font-size: 18px;
  color: #24292e;
  margin-bottom: 18px;
  border-bottom-width: 1px;
  border-bottom-color: #00000066;
  /* background-color: #e9e9e9; */
  /* height: 30px; */
  /* padding-left: 40px; */
`;

export const Input = styled.TextInput`
  font-size: 18px;
  color: #24292e;
  margin-bottom: 18px;
  border-bottom-width: 1px;
  border-bottom-color: #00000066;
  /* background-color: #e9e9e9; */
  /* height: 30px; */
  /* padding-left: 40px; */
`;

export const Icon = styled(SimpleLineIcons)`
  font-size: 25px;
  color: #24292e;
  position: absolute;
  left: 6px;
  top: 2px;
  z-index: 5;
`;

export const TouchEye = styled.TouchableOpacity`
  bottom: 20px;
  position: absolute;
  right: 0;
  z-index: 5;
`;

export const IconEye = styled(MaterialCommunityIcons)`
  font-size: 25px;
  color: #00000066;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const Option = styled.Text`
  color: #004b8b;
  font-weight: bold;
  align-self: center;
  font-size: 16px;
  margin-top: 12px;
  text-decoration: underline;
`;

export const ErrorText = styled.Text`
  align-self: center;
  color: #c62828;
  font-size: 16px;
`;
