import { Fragment } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "../pages/login/login";
import Cadastro from "../pages/cadastro/cadastro";
import Home from "../pages/home/home";
import Feed from "../pages/feed/feed"



//Verifica se a pessoa está logada, se não ele direciona para a página de login, se estiver ele retorna para o Item(no caso a página Home)
const Private = ({Item}) => {
    const signed = false;

    return signed > 0 ? <Item/> : <Login/>
}


const Router = () => {
    return(
        <>
        <BrowserRouter>
        <Fragment>
        <Routes>
            <Route path="/" element={ <Login/>}/>
            <Route path="/home" element={ <Home/>}/>
            <Route path="/cadastro" element={ <Cadastro /> }/>
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
        </Routes>
        </Fragment>
        </BrowserRouter>
        </>
    );
}

export default Router