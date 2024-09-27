import './login.css';
import Card from '../../componentes/Card';
import Texto from '../../componentes/Texto';
import InputsEBotao from '../../componentes/InputsEBotao'
import DivCircular from '../../componentes/DivCircular';
import appleLogo from '../../imgs/appleLogo.png';
import faceLogo from '../../imgs/faceLogo.png';
import googleLogo from '../../imgs/googleLogo.png';
import { Link } from 'react-router-dom';

function Login(){
    return(
        <>
        <body>
        <Card altura='500px' largura='400px'>
          <Texto peso='10' tamanho='26px'>Seja Bem-Vindo Ao Planix</Texto>
          <form class='formulario'>
            <div class='sessaoDeInputs'>
              <InputsEBotao placeholder='E-mail' class='inputs'></InputsEBotao>
              <InputsEBotao placeholder='Senha' class='inputs'></InputsEBotao>
              <InputsEBotao placeholder='Nome de usuário' class='inputs'></InputsEBotao>
            </div>

            <a href=''>Esqueceu a Senha...</a>

            <input type="submit" class='Submit' value='Enviar'></input>
          </form>
          <div class='logosRedesSociais'>
            <DivCircular>
              <img src={appleLogo} height='35px' width='30px' alt='' />
            </DivCircular>
            <DivCircular>
              <img src={googleLogo} height='30px' width='30px' alt='' />
            </DivCircular>
            <DivCircular>
              <img src={faceLogo} height='30px' width='30px' alt='' />
            </DivCircular>
          </div>
          <div class='criarConta'>
            <p class='criarContaP'>Não tem uma senha ainda <Link to={'/cadastro'}>Crie sua Conta</Link></p>
          </div>
        </Card>
      </body>    
        </>
    )
}

export default Login;