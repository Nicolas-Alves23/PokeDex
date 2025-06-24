import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Paginas/Inicial";
import { Perfil } from "../Paginas/Perfil";
import { Serie } from "../Paginas/Serie";
import { Lista } from "../Componentes/Lista";

export function Rotas(){
    return(
        
        <Routes>
            <Route path="/" element = {<Inicial/>}>
                <Route index element = {<Lista/>}/>
                <Route path= 'perfil'element={<Perfil/>}/>
                <Route path= 'series'element={<Serie/>}/>
            </Route>
        </Routes>
        

    )
}