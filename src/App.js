import './App.css';
import { createGlobalStyle } from "styled-components";
import Router from './Router/index.js';
import { GlobalProvider } from './contexts/GlobalContext.js';

const GlobalStyle = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
    border: 0;
    text-decoration: none;
    width: 100vw;
    display: flex;
    justify-content:center;
    align-items: center;
    zoom: 1;
  }

  main{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;   

}

`;

function App() {

     

  return (
    <GlobalProvider>
      <GlobalStyle />
      <Router/>
    </GlobalProvider>
  );
}

export default App;
