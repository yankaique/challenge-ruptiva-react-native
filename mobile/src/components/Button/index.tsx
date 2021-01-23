import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);
export default Button;
