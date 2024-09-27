import './criarConta.css';
import Card from '../../componentes/Card';
import Texto from '../../componentes/Texto';
import InputsEBotao from '../../componentes/InputsEBotao'
import DivCircular from '../../componentes/DivCircular';
import appleLogo from '../../imgs/appleLogo.png';
import faceLogo from '../../imgs/faceLogo.png';
import googleLogo from '../../imgs/googleLogo.png';



function CriarConta() {
  return (
    <>
      <body>
        <Card altura='500px' largura='400px'>
          <Texto peso='10' tamanho='26px'>Crie sua Conta</Texto>
          <form class='formulario'>
            <InputsEBotao placeholder='E-mail' class='inputs'></InputsEBotao>
            <InputsEBotao placeholder='Crie um usuário' class='inputs'></InputsEBotao>
            <InputsEBotao placeholder='Senha' class='inputs'></InputsEBotao>
            <InputsEBotao placeholder='Confirme sua Senha' class='inputs'></InputsEBotao>
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
        </Card>
      </body>
    </>
  )
}

export default CriarConta;