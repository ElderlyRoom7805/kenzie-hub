import { useContext } from "react";
import { EveryRotes } from "../../context"
import styles from "./index.module.scss";
import { Outlet } from "react-router-dom";
import { ModalCreateTech } from "../../components/createTeachModal/index.jsx"
import { ModalTechEdit } from "../../components/EditTechModal/index.jsx";
import { Tech } from "../../context/techContext";

export const PrincipalPage = () =>{
    const { acount, userLogout, setOpen, open } = useContext(EveryRotes);
    const { open2} = useContext(Tech)
    return( 
        <>
            {open? <ModalCreateTech /> : null}
            {open2? <ModalTechEdit /> : null}
            { acount ? 
                    <>
                    <header className={ styles.header_page}>
                        <div>
                            <h1>Kenzie Hub</h1>
                            <button onClick={() =>{userLogout()}}>Sair</button>
                        </div>
                    </header>
                    
                    <div className={ styles.div_page}>
                        <div>
                            <h1>olá, {acount.name}</h1>
                            <span>{acount.course_module}</span>
                        </div>
                    </div>
                    <main className={ styles.main_page}>
                        <div className={styles.div_head_tech}>
                            <h2>Tecnologias</h2>
                            <button onClick={() => {setOpen(true)}}>+</button>
                        </div>
                        <div className={styles.div_tech}>
                            <Outlet />
                        </div>
                    </main> 
                    </>
                : null
            }
        </>
    )
}