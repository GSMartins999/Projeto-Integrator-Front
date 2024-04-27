import { Fragment } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "../pages/login/login";
import Cadastro from "../pages/cadastro/cadastro";
import ErrorPage from "../pages/error/ErrorPage";
import Feed from "../pages/feed/feed";
import Comentarios from "../pages/comentarios/comentarios";



const Router = () => {
    return(
        <>
        <BrowserRouter>
        <Fragment>
        <Routes>
            <Route path="/" element={ <Login/>}/>
            <Route path="/Comentarios" element={ <Comentarios/>}/>
            <Route path="/cadastro" element={ <Cadastro /> }/>
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/comentarios/:postId" element={<Comentarios />} />
        </Routes>
        </Fragment>
        </BrowserRouter>
        </>
    );
}

export default Router
