import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [apelido, setApelido] = useState(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <GlobalContext.Provider value={{ apelido, setApelido, email, setEmail, password, setPassword }}>
      {children}
    </GlobalContext.Provider>
  );
};