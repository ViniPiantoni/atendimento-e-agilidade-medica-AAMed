import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: #e2e2e2;
`;

export const Wrapper = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  /* marginHorizontal: 10; */
`;

export const Permissions = styled.View`
  background-color: #e2e2e2;
  border-radius: 5px;
  margin-top: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.5;
  shadow-radius: 2px;
  elevation: 10;
`;

export const PermissionsTitle = styled.Text`
  align-self: flex-start;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: #00000000;
`;

export const SwitchSeparator = styled(Separator)`
  background-color: #bfbfbf;
`;

export const SwitchPermissions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
`;

export const SwitchText = styled.Text`
  font-size: 16px;
`;

export const ConfigButtons = styled.View`
  height: 200px;
  justify-content: space-between;
  margin-top: 30px;
`;

export const ButtonView = styled.View`
  padding-left: 30px;
  padding-right: 30px;
`;

export const ButtonText = styled.Text`
  padding: 20px;
  font-size: 15px;
  text-align: center;
  color: #e2e2e2;
  font-weight: bold;
`;

export const ButtonIcon = styled(FontAwesome)`
  position: absolute;
  align-self: flex-end;
  padding: 20px;
  right: 10px;
  font-size: 22px;
  color: #e2e2e2;
`;
