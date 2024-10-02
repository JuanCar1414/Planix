import './criarConta.css';
import Card from '../../componentes/Card';
import Texto from '../../componentes/Texto';
import InputsEBotao from '../../componentes/InputsEBotao'
import DivCircular from '../../componentes/DivCircular';
import appleLogo from '../../imgs/appleLogo.png';
import faceLogo from '../../imgs/faceLogo.png';
import googleLogo from '../../imgs/googleLogo.png';
import React, { useState } from 'react';



function CriarConta() {
  const [email, setEmail] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    if (senha !== senhaConfirmacao) {
      alert("As senhas não conferem!");
      return;
    }

    const dadosCadastro = {
      Email: email,
      Senha: senha,
      NomeUsuario: nomeUsuario
    };

    try {
      const response = await fetch('http://localhost:1414/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosCadastro)
      });

      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        // Aqui você pode redirecionar o usuário ou limpar os campos, se desejar
        setEmail('');
        setNomeUsuario('');
        setSenha('');
        setSenhaConfirmacao('');
      } else {
        alert("Ocorreu um erro no cadastro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Ocorreu um erro no cadastro. Tente novamente.");
    }
  };

  return (
    <div id='corpoCriarConta'>
      <Card altura='500px' largura='400px'>
        <Texto peso='10' tamanho='26px'>Crie sua Conta</Texto>
        <form id='formularioCriarConta' onSubmit={handleSubmit}>
          <InputsEBotao
            placeholder='E-mail'
            className='inputs'
            largura='310px'
            altura='30px'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputsEBotao
            placeholder='Crie um usuário'
            className='inputs'
            largura='310px'
            altura='30px'
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
          />
          <InputsEBotao
            placeholder='Senha'
            className='inputs'
            largura='310px'
            altura='30px'
            type='password'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <InputsEBotao
            placeholder='Confirme sua Senha'
            className='inputs'
            largura='310px'
            altura='30px'
            type='password'
            value={senhaConfirmacao}
            onChange={(e) => setSenhaConfirmacao(e.target.value)}
          />
          <input type="submit" id='Submit' value='Enviar'></input>
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
      </Card>
    </div>
  );
}

export default CriarConta;