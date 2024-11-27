import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CriarConta from './pages/criarConta/criarConta';
import Login from './pages/login/login';
import TelaInicio from './pages/telaInicio/telaInicio';
import EsqueceuSenha from './pages/esqueceuSenha/esqueceuSenha';

import Home from './pages/home/Home';
import VisualizarTarefaMetaModal from './componentes/Modals/VisualizarTarefaModal';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TelaInicio></TelaInicio>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/cadastro' element={<CriarConta></CriarConta>}></Route>
        <Route path='/esquecisenha' element={<EsqueceuSenha></EsqueceuSenha>}></Route>
        <Route path='/home/:NomeUsuario' element={<Home />} />


        <Route path='/testeComp' element={<VisualizarTarefaMetaModal />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;