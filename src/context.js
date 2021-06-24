import React from "react";

const UserContext = React.createContext({
  username: undefined,
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  language: "en",
  isLogged: undefined,
  toggleLanguage: (language) => {},
  loginUser: (refresh, access) => {},
  logoutUser: () => {},
});

export { UserContext };
