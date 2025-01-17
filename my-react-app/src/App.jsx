import { createContext, useContext } from "react"
import { EveryRotes } from "./context"
import { RouterProvider, createBrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./routes/login/index.jsx";
import { Register } from "./routes/register/index.jsx";
import { PrincipalPage } from "./routes/page1";
import "./styles/globalStyles.scss"
import { List } from "./components/techList/index.jsx";

function App() {
  return (
    <>
      <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/page" element={<PrincipalPage />} >
              <Route index element={<List />} />
            </Route>
      </Routes>
    </>
  )
}

export default App
