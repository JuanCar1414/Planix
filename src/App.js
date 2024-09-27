import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CriarConta from './pages/criarConta/criarConta';
import Login from './pages/login/login';
import TelaInicio from './pages/telaInicio/telaInicio';
import NavBar from './componentes/NavBar/NavBar';
import Home from './pages/telaHome/telaHome';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/cadastro' element={<CriarConta></CriarConta>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;