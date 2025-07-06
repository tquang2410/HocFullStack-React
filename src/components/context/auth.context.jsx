import {createContext, useState, useEffect} from "react";
import {getUserApi} from "../../util/api.js";

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        name: '',
        email: ''
    }
}
);
export const AuthWrapper = (props)=> {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            name: '',
            email: ''
        }
    });

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if(token) {
                const res = await getUserApi();
                if(res && !res.message) {
                    setAuth({
                        isAuthenticated: true,
                        user: {
                            name: res.name || '',
                            email: res.email || ''
                        }
                    });
                } else {
                    setAuth({
                        isAuthenticated: false,
                        user: { name: '', email: '' }
                    });
                    localStorage.removeItem('accessToken');
                }
            }
        };
        checkAuth();
    }, []);

    return(
        <AuthContext.Provider value={{
            auth,setAuth
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}