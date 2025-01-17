import { useContext } from "react"
import { Register } from "../../routes/register"
import { EveryRotes } from "../../context";
import { Tech } from "../../context/techContext";
import { useForm } from "react-hook-form";


export const ModalCreateTech = () => {
    const { setOpen } = useContext(EveryRotes);
    const { add } = useContext(Tech)
    const { register, handleSubmit } = useForm();

    const useAdd = (formData) =>{
         add(formData);
    };
    
    return(
        <div role="dialog" className="modal">
            <div className="modal_box">

                <div className="header_modal">
                    <div>
                        <h2>Cadastrar Tecnologia</h2>
                        <button onClick={() => {setOpen(false)}}>X</button>
                    </div>
                </div>
                <form className="main_modal" onSubmit={handleSubmit(useAdd)}>
                    <div>
                        <label htmlFor="add_name">Nome</label>
                        <input type="text" id="add_name" placeholder="Typescript" {...register("title")}/>
                    </div>
                    <div>
                        <label htmlFor="select_tech">Selecionar Status</label>
                        <select name="status" id="select_tech" {...register("status")}>
                            <option value="Iniciante">Iniciante</option>
                            <option value="Intermediário">Intermediário</option>
                            <option value="Avançado">Avançado</option>
                        </select>
                    </div>
                    <button>Cadastrar Tecnologia</button>
                </form>
            </div>
        </div>
    )
}