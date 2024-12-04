import React, { useState } from 'react';
import './login.css';
import Card from '../../componentes/Card';
import Texto from '../../componentes/Texto';
import InputsEBotao from '../../componentes/InputsEBotao';
import DivCircular from '../../componentes/DivCircular';
import appleLogo from '../../imgs/appleLogo.png';
import faceLogo from '../../imgs/faceLogo.png';
import googleLogo from '../../imgs/googleLogo.png';
import logoPlanix from '../../imgs/logoLoginPlanix.png';
import { Link, useNavigate } from 'react-router-dom';

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
      // Realizando a requisição POST para o backend
      const response = await fetch('https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLogin)
      });

      if (response.ok) {
        const data = await response.json();
        const NomeUsuario = data.NomeUsuario; // Agora obtém o NomeUsuario da resposta

        // Verifica se o NomeUsuario foi retornado corretamente
        if (NomeUsuario) {
          // Armazene o nome do usuário no localStorage para persistência
          localStorage.setItem('NomeUsuario', NomeUsuario);

          // Redireciona para a página Home, incluindo o nome na URL
          navigate(`/home/${NomeUsuario}`);
        } else {
          setMensagem('Nome de usuário não encontrado na resposta.');
        }
      } else {
        const data = await response.json();
        setMensagem(data.message || 'Erro ao realizar login');
      }
    } catch (error) {
      setMensagem('Erro ao entrar no perfil.');
      console.error(error);
    }
  };

  return (
    <div id='corpoLogin'>
      <Card altura='420px' largura='400px' id='cardForm'>
      <img src={logoPlanix} height='90px'alt='' id='logoPlanix'/>
        <form className='formulario' onSubmit={handleSubmit}>
          <div className='sessaoDeInputsLogin'>
            <div id='msgTemp'>
              {mensagem && <Texto peso='100' tamanho='16px' cor='#ff0000' id='msgAlerta'>{mensagem}</Texto>}
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
        <div className='criarConta'>
          <p className='criarContaP'>Não tem uma conta ainda? <Link to={'/cadastro'}>Crie sua Conta</Link></p>
        </div>
        <div className='logosRedesSociais'>
          <DivCircular>
            <img src={appleLogo} height='25px' alt='' />
          </DivCircular>
          <DivCircular>
            <img src={googleLogo} height='25px' alt='' />
          </DivCircular>
          <DivCircular>
            <img src={faceLogo} height='25px' alt='' />
          </DivCircular>
        </div>
       
      </Card>
    </div>
  );
}

export default Login;
