import { createContext, useState, useContext,useEffect } from "react";
import { fetchLogout, fetchMe } from "../components/api";
import { Flex, Spinner } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [LoggedIn, setLoggedIn] = useState(false);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
        try{
            const me = await fetchMe()
            console.log(me)
            setLoggedIn(true)
            setUser(me)
            setLoading(false)
        }catch(e){
            setLoading(false)
        }
    })();
  },[])

  const login = (data) => {
    setLoggedIn(true);
    setUser(data.user);

    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token",data.refreshToken);
    
  };

  const logout = async (callback) => {
    
    setLoggedIn(false)
    setUser(null)
    await fetchLogout();

    localStorage.removeItem("access-token")
    localStorage.removeItem("refresh-token")
    callback()
  }


  
  const values = {
    login,
    LoggedIn,
    User,
    logout
  };

  if (loading){
    return(<Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl"></Spinner>
    </Flex>)
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
