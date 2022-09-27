import React, { createContext, useState } from 'react';

export const Utils = createContext({});

const UtilsContext = ({ children }) => {

  const [loading, setLoading] = useState(false);

  return (
    <Utils.Provider value={{ loading, setLoading }}>
      {children}
    </Utils.Provider>
  )

}

export default UtilsContext;