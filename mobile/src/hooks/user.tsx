import React, { useCallback, useState, createContext, useContext } from 'react';
import { database } from '../services/connection';

interface User {
  id?: string;
  name: string;
  document: number;
  type: 'individual' | 'business';
}

interface UserContextData {
  push();
  post(data: User);
  remove(id: string);
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const UserProvider: React.FC = ({ children }: any) => {
  const [userInfo, setUserInfo] = useState<User[] | undefined>([]);

  const push = useCallback(async () => {
    await database.collection('users').onSnapshot(query => {
      const list = [];
      query.forEach(doc => {
        list.push(doc.data);
      });
      setUserInfo(list);
    });

    return userInfo;
  }, []);

  const post = useCallback(async (data: User) => {
    await database.collection('users').add({
      data,
    });
  }, []);

  const remove = useCallback(async (id: string) => {
    await database.collection('users').doc(id).delete();
  }, []);

  return (
    <UserContext.Provider value={{ push, post, remove }}>
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
