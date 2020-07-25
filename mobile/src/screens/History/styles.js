import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const List = styled(FlatList)`
  margin-top: 16px;
`;

export const HistoryView = styled.View`
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.5;
  shadow-radius: 2px;
  elevation: 2;
`;

export const HistoryProp = styled.Text`
  font-weight: bold;
  color: #004b8b;
  font-size: 15px;
`;

export const HistoryInfo = styled.Text`
  color: #00000086;
  font-size: 15px;
  margin-bottom: 5px;
`;

export const NoHistoryView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #f4f4f4;
`;

export const Img = styled.Image`
  width: 145px;
  opacity: 0.5;
`;

export const NoHistoryLabel = styled.Text`
  font-size: 16px;
  color: #00000086;
  font-weight: bold;
`;
