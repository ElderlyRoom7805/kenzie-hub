import { useContext } from "react";
import { Tech } from "../../context/techContext";
import { CiTrash } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";


export const List = () => {
    const {tech, remove, setOpen2, setEdit, edit} = useContext(Tech);
    return(
        <ul>
            {tech.map((e) => {
                return(
                <li key={e.id}>
                        <h3>{e.title}</h3>
                        <div>
                            <span>{e.status}</span>
                            <button onClick={()=>{
                            setEdit(e);
                            setOpen2(true)}}><FaPencilAlt color="#ffffff"/></button>
                            <button onClick={()=>{remove(e.id)}}><CiTrash color="#FFFFFF" /></button>
                        </div>
                </li>
            )}
            )}
        </ul>
    )
}