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

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const dadosLogin = {
      Email: email,
      senha: senha // Certifique-se de usar 'senha' aqui para corresponder ao seu backend
    };

    try {
      const response = await fetch('http://localhost:1414/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLogin)
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.msg); // Mensagem de sucesso do servidor
        // Aqui você pode armazenar o token ou redirecionar o usuário
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Mensagem de erro do servidor
      }
    } catch (error) {
      console.error("Erro ao realizar o login:", error);
      alert("Ocorreu um erro no login. Tente novamente.");
    }
  };

  return (
    <>
      <Card altura='500px' largura='400px'>
        <Texto peso='10' tamanho='26px'>Seja Bem-Vindo Ao Planix</Texto>
        <form className='formulario' onSubmit={handleSubmit}>
          <div className='sessaoDeInputs'>
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
            <InputsEBotao
              placeholder='Confirmar senha'
              className='inputs'
              type='password'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <a href=''>Esqueceu a Senha...</a>

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