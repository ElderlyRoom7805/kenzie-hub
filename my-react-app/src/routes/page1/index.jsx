import { useContext } from "react";
import { EveryRotes, useContextFast } from "../../context"
import { HeaderComponent } from "../../components/header";
import styles from "./index.module.scss";


export const PrincipalPage = () =>{
    const { acount, userLogout } = useContext(EveryRotes);
    console.log(acount)
    return(
        <>
            <header className={ styles.header_page}>
                <h1>Kenzie Hub</h1>
                <button onClick={userLogout}>Sair</button>
            </header>
            
            <div>
                <h3>olá, {acount.name}</h3>
                <span>{acount.course_module}</span>
            </div>
            <main>
                
            </main>
        </>
    )
}