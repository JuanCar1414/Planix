
import "./telaInicio.css"
import logoProjeto from '../../imgs/logoProjeto.jpg';
import { Link, useNavigate } from "react-router-dom";



function TelaInicio() {
    const navigation = useNavigate();
    const irParaLogin = () => {
        navigation('/login')
        console.log('btn pressionad')
    }

    return (
        <div className="App">
            
            <div id="corpoInicio">
                <img src={logoProjeto} alt="" height='200px' width='350px' />
                <div class='btns'>

                    <Link to={'/login'}><button class='botaoEstilo'>Login</button></Link>

                    <Link to={'/cadastro'}><button class='botaoEstilo'>Cadastro</button></Link>

                </div>

            </div>

        </div>

    );
}

export default TelaInicio;