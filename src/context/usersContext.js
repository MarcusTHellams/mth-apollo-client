import { createContext, useContext, useState } from 'react';

const UsersContext = createContext({
    userData: { users: {}, posts: {}, todos: {}},
    totalCount: 1,
    setUserData: ()=>{},
    setTotalCount: ()=>{}
});

export const useUsersContext = () => useContext(UsersContext);

export const UsersProvider = ({ children }) => {
  const [userData, setUserData] = useState({ users: {}, posts: {}, todos: {}});
  const [totalCount, setTotalCount] = useState(1);
  return (
    <>
      <UsersContext.Provider value={{ userData, setUserData, totalCount, setTotalCount }}>
        {children}
      </UsersContext.Provider>
    </>
  );
};
