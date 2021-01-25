import React from 'react';
import { UserProvider } from './methods';

const AppUser: React.FC = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default AppUser;
