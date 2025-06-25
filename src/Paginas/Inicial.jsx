
import { Cabecalho } from '../Componentes/Cabecalho';   
import { Footer } from '../Componentes/Footer';            
import { Outlet } from 'react-router-dom';

export function Inicial(){
    return(
        <>
  
        <Cabecalho/>
        <Outlet/>
        <Footer/>
        </>
    )
}