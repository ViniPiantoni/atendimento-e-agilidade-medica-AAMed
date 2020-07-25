import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

export const Contact = styled.View`
  justify-content: flex-start;
  align-self: center;
  padding: 25px;
`;

export const NumberContact = styled.Text`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: #1e1e24;
`;

export const Legend = styled.Text`
  text-align: center;
  color: #b3b5b9;
  font-size: 18px;
  height: 45px;
`;

export const Search = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const SearchInput = styled.TextInput`
  width: 100%;
  padding-right: 70px;
  height: 50px;
  text-align: center;
  font-size: 14px;

  border-style: solid;
  border-width: 1px;
  border-bottom-width: 3px;
  border-radius: 5px;
  background-color: #eff1f3;
  border-color: #eaebef;
  border-bottom-color: #d3d3d7;
`;

export const MgGlass = styled(MaterialIcons)`
  position: absolute;
  top: 10px;
  left: 20px;
  color: #006bad;
  font-size: 30px;
  z-index: 10;
`;

export const SearchLabel = styled.Text`
  position: absolute;
  height: 100px;
  top: 15px;
  left: 220px;
  color: #006bad;
  font-size: 15px;
  font-weight: bold;
  z-index: 4;
`;

export const Img = styled.Image`
  width: 100%;
  height: 150px;
`;

export const WebSupport = styled.View`
  height: 80px;
  width: 100%;
  background-color: #04c07c;
`;

export const WebSupportButton = styled.View`
  height: 40px;
  width: 200px;
  margin-top: 18px;
  align-self: center;
  border-radius: 5px;
  border-width: 2px;
  border-color: #fff;
`;

export const WebSupportLabel = styled.Text`
  font-size: 15px;
  color: #fff;
  text-align: center;
  padding: 6px;
  font-weight: bold;
`;

export const Options = styled.View`
  background-color: #006bad;
  /* padding-top: 20px; */
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  padding: 20px;
`;

export const Label = styled.Text`
  font-size: 15px;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;
