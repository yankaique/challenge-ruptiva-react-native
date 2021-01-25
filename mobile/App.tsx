import React from 'react';
import { StatusBar } from 'react-native';

import Form from './src/pages/Form';
import AppUser from './src/hooks/user';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#398efe" />
      <AppUser>
        <Form />
      </AppUser>
    </>
  );
}
