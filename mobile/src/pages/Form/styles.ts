import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
    flex:1;
    padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
    margin-top: 80px;
`;

export const Title = styled.Text`
  font-size: 25px;
  align-self: flex-start;
`;

export const HeaderImage = styled.Image`
  width: 100%;
  height: 200px;
  position: absolute;
`;

export const Scroll = styled.ScrollView``;
