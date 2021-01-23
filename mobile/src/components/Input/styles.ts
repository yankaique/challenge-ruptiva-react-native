import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: #ffffff;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #f3f3f6;
  flex-direction: row;
  align-items: center;
  ${props=> props.isErrored && css`
    border-color: #c53030;
  `}
  ${props => props.isFocused && css`
    border-color: #398efe;
  `}
`;


export const TextInput = styled.TextInput`
  flex: 1;
  color: #091a32;
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
