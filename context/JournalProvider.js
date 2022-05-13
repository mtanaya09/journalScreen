import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JournalContext = createContext();
const JournalProvider = ({ children }) => {
  const [journals, setJournals] = useState([]);

  const findJournals = async () => {
    const result = await AsyncStorage.getItem("journals");
    if (result !== null) setJournals(JSON.parse(result));
    // AsyncStorage.clear();
  };

  useEffect(() => {
    findJournals();
  }, []);
  return (
    <JournalContext.Provider value={{ journals, setJournals, findJournals }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournals = () => useContext(JournalContext);

export default JournalProvider;
