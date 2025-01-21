import { useContext } from "react";
import { useForm } from "react-hook-form";
import { EveryRotes} from "../../context";
import { useNavigate } from "react-router-dom";
import { api } from "../../server/api";
import styles from "./index.module.scss";

export const Login = () => {
    const { userLogin } = useContext(EveryRotes);

    const { register, handleSubmit } = useForm();
    
    const navigate = useNavigate();
    
    const submit = (formData) => {  
        userLogin(formData.email, formData.password)
    }

    const inputsList = [{
        id: 1,
        label: "Email",
        placeHolder: "Digite seu email",
        type: "email",
    },
    {
        id: 2,
        label: "Senha",
        placeHolder: "Digite sua senha",
        type: "password",
    }]

    return(
        <>
            <header className={ styles.header_login}>
                <h1>Kenzie Hub</h1>
            </header>
            <main className={ styles.main_login}>
                <h2>Login</h2>
                    <form onSubmit={handleSubmit(submit)}>
                        {inputsList.map(e =>{
                            return(
                                <div key={e.id} className={ styles.input_div}>
                                    <label htmlFor={e.label}>{ e.label }</label>
                                    <input {...register(e.type)} id={e.label} placeholder={ e.placeHolder } type={e.type} required/>
                                </div>
                            )
                        })}
                        <button type="submit">Entrar</button>
                    </form>
                    <span>Ainda não possui uma conta?</span>
                    <button onClick={() => {navigate("/register")}}>Cadastre-se</button>
            </main>

        </>
    )
}