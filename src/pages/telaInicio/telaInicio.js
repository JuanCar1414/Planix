
import "./telaInicio.css"
import logoProjeto from '../../imgs/logoProjeto.jpg';
import { Link, useNavigate } from "react-router-dom";



function TelaInicio() {

    return (
        <div id="corpoEsqSenha">
            <img src={logoProjeto} alt="" height='200px' width='350px' />
            <div class='btns'>

                <Link to={'/login'}><button class='botaoEstilo'>Login</button></Link>
                <Link to={'/cadastro'}><button class='botaoEstilo'>Cadastro</button></Link>

            </div>

        </div>


    );
}

export default TelaInicio;