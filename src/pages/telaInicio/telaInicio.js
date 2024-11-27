
import "./telaInicio.css"
import logoProjeto from '../../imgs/logoProjeto.jpg';
import { Link, useNavigate } from "react-router-dom";
import Texto from "../../componentes/Texto";

import logoPlanixAzul from '../../imgs/logoPlanixAzul.png';
// import InputsEBotao from '../InputsEBotao';



function TelaInicio() {

    return (
        <div id="corpoIncioTela">
            <div id='header'>
                <div id="logo">
                    <img src={logoPlanixAzul} height='80px' width='300px' />
                </div>

                <div id="txtModos">
                    <Link to={'/login'}><Texto peso='600' tamanho='15px' cor='#555' className='textoHeader'>Login</Texto></Link>

                    <Link to={'/cadastro'}><Texto peso='600' tamanho='15px' cor='#555' className='textoHeader'>Cadastro</Texto></Link>
                </div>

            </div>
            <div className='txtsInicioTela'>
                <Texto peso="lighter" tamanho="64px" cor="#2D5186" id="txtSuperio">
                    O melhor aplicativo para seus planejamentos e economias.
                </Texto>
                <Texto peso="lighter" tamanho="26px" cor="#888" id="txtSuperiorSubt">
                    Com o Planix fica fácil para planejar sua rotina e economias, por meio de listas e tabelas só para você.
                </Texto>
            </div>

        </div>


    );
}

export default TelaInicio;