import { notification } from "antd";
import { createContext } from "react";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [ api, currentContext ] = notification.useNotification({
        placement: "bottomRight",
  })
    return ( 
        <AuthContext.Provider value={{api}}>
            { currentContext}
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthProvider;