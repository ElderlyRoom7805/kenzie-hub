
import { useForm } from "react-hook-form";
import { EveryRotes} from "../../context";
import { useContext } from "react";
import { api } from "../../server/api";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { toast } from "react-toastify";

export const Register = () => {
    const { userRegister } = useContext(EveryRotes);
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();

    const inputs = [{
        id:1,
        label: "Nome",
        placeHolder: "Digite seu nome aqui",
        type: "text",
        form: "name",
    },
    {
        id:2,
        label: "Email",
        placeHolder: "Digite seu email aqui",
        type: "email",
        form: "email",
    },
    {
        id:3,
        label: "Senha",
        placeHolder: "Digite sua senha",
        type: "password",
        form: "password",
    },
    {
        id:4,
        label: "Confirmar Senha",
        placeHolder: "Digite novamente sua senha",
        type: "password",
        form: "password2",
    },
    {
        id:5,
        label: "Bio",
        placeHolder: "Fale sobre você",
        type: "text",
        form: "bio",
    },
    {
        id:6,
        label: "Contato",
        placeHolder: "Opção de contato",
        type: "tel",
        form: "contact",
    },
    ]

    const submit = async (formData) => {
        if(formData.password == formData.password2){
            await userRegister(formData);
        } else {
            toast.error("As senhas não correspondem!");
        }
    }
    const returnButton = () =>{
        navigate("/")
    }

    return(
        <>
            <header className={ styles.register_header}>
                <h1>Kenzie Hub</h1>
                <button onClick={returnButton}>Sair</button>
            </header>

            <main className={ styles.register_main}>
                <h2>Crie sua conta</h2>
                <span>Rapido e grátis, vamos nessa</span>
                <form onSubmit={handleSubmit(submit)}>
                    {inputs.map(e =>{
                        return(
                            <div key={e.id} className={styles.input_div}>
                                <label htmlFor={e.label}>{ e.label }</label>
                                <input required type={e.type} {...register(e.form)} id={e.label} placeholder={ e.placeHolder }/>
                            </div>
                        )
                    })}
                    <label htmlFor="modulo">Módulo</label>
                    <select name="mod" id="modulo" {...register("course_module")}>
                        <option disabled >Selecione aqui</option>
                        <option value="Primeiro módulo (Introdução ao Frontend)">Primeiro Módulo </option>
                        <option value="Segundo módulo (Frontend Avançado)">Segundo Módulo </option>
                        <option value="Terceiro módulo (Introdução ao Backend)">Terceiro Módulo </option>
                        <option value="Quarto módulo (Backend Avançado)">Quarto Módulo </option>
                    </select>
                    <button type="submit">Cadastrar</button>
                </form>
            </main>
        </>
    )
}