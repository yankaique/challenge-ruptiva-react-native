import React, { useCallback, useState, createContext, useContext } from 'react';
import { database } from '../../services/connection';

interface User {
  id?: string;
  name: string;
  document: number;
  type: 'individual' | 'business';
}

interface UserContextData {
  post(data: User);
  remove(id: string);
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const UserProvider: React.FC = ({ children }: any) => {
  const post = useCallback(async (data: User) => {
    await database.collection('users').add({
      data,
    });
  }, []);

  const remove = useCallback(async (id: string) => {
    await database.collection('users').doc(id).delete();
  }, []);

  return (
    <UserContext.Provider value={{ post, remove }}>
      {children}
    </UserContext.Provider>
  );
};

function useUserMethods(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserMethods must be used within an UserProvider');
  }

  return context;
}

export { UserProvider, useUserMethods };
