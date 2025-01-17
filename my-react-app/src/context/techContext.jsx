import { createContext, useContext } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { api } from "../server/api";
import { useState, useEffect } from "react";
import { EveryRotes } from ".";


export const Tech = createContext({});

export const TechProvider = ({children}) => {
    const {setOpen, tech, setTech, token} = useContext(EveryRotes);
    const [open2, setOpen2] = useState(false);
    const [edit, setEdit] = useState(null);

    const add = async (formData) => {
        try {
            let { data } = await api.post("/users/techs", formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }});
            setTech([...tech, data]);
            setOpen(false);
        } catch(error){
            console.log(error);
        }

    }
    const remove = async (deleteId) => {
        try {
          await api.delete(`/users/techs/${deleteId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          let newTechList = tech.filter((tech) => tech.id != deleteId);
          setTech(newTechList);
        } catch (error) {
          console.log(error);
        }
      }
    
    const modify = async (formData) =>{
        try {
            let { data } = await api.put(`/users/techs/${edit.id}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            let newTechList = tech.map((tech) => {
              if (tech.id == edit.id) {
                return data;
              } else {
                return tech;
              }
            });
            setTech(newTechList);
            setOpen2(false);
          } catch (error) {
            console.log(error);
            }
    }
    return(
        <Tech.Provider value={{add, tech, remove, modify, open2, setOpen2, edit, setEdit}}>
            {children}
        </Tech.Provider>
    )
}