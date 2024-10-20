import React, { useState } from 'react';
import './login.css';
import Card from '../../componentes/Card';
import Texto from '../../componentes/Texto';
import InputsEBotao from '../../componentes/InputsEBotao';
import DivCircular from '../../componentes/DivCircular';
import appleLogo from '../../imgs/appleLogo.png';
import faceLogo from '../../imgs/faceLogo.png';
import googleLogo from '../../imgs/googleLogo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const dadosLogin = {
      Email: email,
      Senha: senha // Certifique-se de usar 'senha' aqui para corresponder ao seu backend
    };

    try {
      const response = await fetch('https://89061440-c760-4877-89c3-b005ced1868f-00-ymi6i4frct2n.worf.replit.dev/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLogin)
      });

      if (response.ok) {
        navigate('/');
        // Aqui você pode armazenar o token ou redirecionar o usuário
      } else {
        const data = await response.json();
        setMensagem(data.message);
      }
    } catch (error) {
      setMensagem('Erro ao entrar no perfil.');
      console.error(error);
    }
  };

  return (
    <>
      <Card altura='500px' largura='400px'>
        <Texto peso='10' tamanho='26px'>Seja Bem-Vindo Ao Planix</Texto>
        <Texto peso='16' tamanho='16px'>Comece sua nova jornada no planejamento</Texto>
        <form className='formulario' onSubmit={handleSubmit}>
          <div className='sessaoDeInputsLogin'>
            <div id='msgTemp'>
              {mensagem && <Texto peso='16' tamanho='16px' cor='#ff0000'>{mensagem}</Texto>}
            </div>
            <InputsEBotao
              placeholder='E-mail'
              className='inputs'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputsEBotao
              placeholder='Senha'
              className='inputs'
              type='password'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <Link to={'/esquecisenha'}><a>Esqueceu a Senha...</a></Link>

          <input type="submit" className='Submit' value='Enviar'></input>
        </form>
        <div className='logosRedesSociais'>
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
        <div className='criarConta'>
          <p className='criarContaP'>Não tem uma conta ainda? <Link to={'/cadastro'}>Crie sua Conta</Link></p>
        </div>
      </Card>
    </>
  );
}

export default Login;