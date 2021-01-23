import React from 'react';
import { UserProvider } from './user';

const AppUser: React.FC = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default AppUser;
