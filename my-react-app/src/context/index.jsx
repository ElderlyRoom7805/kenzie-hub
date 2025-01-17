import { createContext } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { api } from "../server/api";
import { useState, useEffect } from "react";
import { Login } from "../routes/login/index.jsx";
import { Register } from "../routes/register/index.jsx";
import { PrincipalPage } from "../routes/page1/index.jsx";
import { List } from "../components/techList/index.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EveryRotes = createContext({});

export const EveryProvider = ({children}) => {
    const [open, setOpen] = useState(false);
    const [acount, setAcount] = useState();
    const [tech, setTech] = useState([]);
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
              localStorage.removeItem("@TOKEN");
              localStorage.removeItem("@USERID");
            }
          }
        }
        autoLogin();
    }, []);

    useEffect(() => {
        async function getTechs() {
          if (token) {
            const { data } = await api.get("/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            setTech(data.techs);
          } else {
            setTech([])
          }
          try {
          } catch (error) {
            console.log(error);
          }
        }
        getTechs();
    }, [acount]);
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
            element: <PrincipalPage />,
            children: [
                {
                    path: "list",
                    element: <List />,
                }
            ]
        }
    ]);
    const userRegister = async (formData) => {
        try {
            const p = await api.post("/users", formData);
            navigate("/")
        } catch (error) {
            if (error.response.status == 400) {
                toast.error("A senha deve conter no mínimo 6 caracteres!");
              } else {
                toast.error("E-mail já cadastrado!");
            }
        }
    }

    const userLogin = async (email, password) => {
        try {
            let { data } = await api.post("/sessions", {email, password});
            localStorage.setItem("@TOKEN", data.token);
            localStorage.setItem("@USERID", data.user.id);
            setAcount(data.user);
            navigate("/page")
        } catch{
            toast.error("E-mail ou senha incorretos!");
        }

    }
    const userLogout = async (formData) => {
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
        setAcount(null);
        navigate("/");
    }
    return(
        <EveryRotes.Provider value={{acount, userLogin, userRegister, userLogout, routes, open, setOpen, tech, setTech, token}}>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover theme="dark"/>
            {children}
        </EveryRotes.Provider>
    )
}

