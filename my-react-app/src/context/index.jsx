import { createContext, useContext } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { api } from "../server/api";
import { useState, useEffect } from "react";
import { Login } from "../routes/login/index.jsx";
import { Register } from "../routes/register/index.jsx";
import { PrincipalPage } from "../routes/page1/index.jsx";
export const EveryRotes = createContext({});

export const EveryProvider = ({children}) => {
    const [userTechs, setUserTechs] = useState([]);
    const [open, setOpen] = useState([]);
    const [acount, setAcount] = useState();
    const navigate = useNavigate();
    let acountId = localStorage.getItem("@USERID");
    let token = localStorage.getItem("@TOKEN");

    useEffect(() => {
        const autoLogin = async () => {
          if (token && acountId) {
            try {
              let { data } = await api.get(`/users/${acountId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setAcount(data);
              navigate("/page");
            } catch (error) {
              console.log(error);
              localStorage.removeItem("@TOKEN");
              localStorage.removeItem("@USERID");
            }
          }
        }
        autoLogin();
      }, []);

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "register",
            element: <Register />,
        },
        {
            path: "page",
            element: <PrincipalPage />
        }
    ]);

    const isOpen = () =>{
        setOpen(!open)
    }
    const userRegister = async (formData) => {
        try {
            const p = await api.post("/users", formData);
            console.log(p)
            console.log(formData)
            navigate("/")
        } catch (error) {
            console.log("Erro ao fazer login:", error.response?.data || error.message);
            
        }
    }

    const userLogin = async (email, password) => {
        try {
            let { data } = await api.post("/sessions", {email, password});
            localStorage.setItem("@TOKEN", data.token);
            localStorage.setItem("@USERID", data.user.id);
            setAcount(data.user);
            console.log(data)
            navigate("/page")
        } catch(error){
            console.log(error);
        }

    }
    const userLogout = async (formData) => {
        try {
            localStorage.removeItem("@TOKEN");
            localStorage.removeItem("@USERID");
            setAcount(null);
            navigate("/");
        } catch(error){
            console.log(error);
        }

    }
    return(
        <EveryRotes.Provider value={{acount, userLogin, userRegister, userLogout, routes}}>
            {children}
        </EveryRotes.Provider>
    )
}

export const useContextFast = () => useContext(EveryRotes);
