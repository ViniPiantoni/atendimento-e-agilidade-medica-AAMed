import styled from 'styled-components/native';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export const EditBox = styled.View`
  flex: 1.25;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 50px;
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
  padding-top: 30px;
`;

export const Input = styled.TextInput`
  font-size: 18px;
  color: #24292e;
  margin-bottom: 18px;
  border-bottom-width: 1px;
  border-bottom-color: #00000066;
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
