import { useContext } from "react";
import { EveryRotes, useContextFast } from "../../context"
import { HeaderComponent } from "../../components/header";
import styles from "./index.module.scss";
import { Outlet } from "react-router-dom";


export const PrincipalPage = () =>{
    const { acount, userLogout } = useContext(EveryRotes);
    console.log(acount)
    return( 
        <>
            <header className={ styles.header_page}>
                <div>
                    <h1>Kenzie Hub</h1>
                    <button onClick={userLogout}>Sair</button>
                </div>
            </header>
            
            <div className={ styles.div_page}>
                <div>
                    <h1>olá, {acount.name}</h1>
                    <span>{acount.course_module}</span>
                </div>
            </div>
            <main className={ styles.main_page}>
                <div>
                    <h2>Tecnologias</h2>
                    <button>+</button>
                </div>
                <Outlet />
            </main>
        </>
    )
}