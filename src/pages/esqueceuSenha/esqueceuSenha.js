import React, { useState } from 'react';
import './esqueceuSenha.css';
import Card from '../../componentes/Card';
import Texto from '../../componentes/Texto';
import InputsEBotao from '../../componentes/InputsEBotao';
import imgEsueceuSenha from '../../imgs/imgEsquecerSenha.png';
import { Link } from 'react-router-dom';

export default function EsqueceuSenha() {
    const [email, setEmail] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (novaSenha !== confirmarSenha) {
            setMensagem('As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch('https://89061440-c760-4877-89c3-b005ced1868f-00-ymi6i4frct2n.worf.replit.dev/esqueci-senha', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email, Senha: novaSenha }),
            });

            const data = await response.json();
            if (response.ok) {
                setMensagem(data.msg);
            } else {
                setMensagem(data.message);
            }
        } catch (error) {
            setMensagem('Erro ao atualizar a senha.');
            console.error(error);
        }
    };

    return (
        <div id='corpoEsqSenha'>
            <Card altura='500px' largura='400px' id='cardForm'>
                <div id='parteSuperiorEsqueciSenha'>
                    <Link to={"/login"}><InputsEBotao
                        id='btnDeVoltarEsqSenha'
                        largura='40px'
                        altura='40px'
                        type='button'
                    /></Link>
                    <Texto peso='10' tamanho='26px' id='txtEsqueciSenha'>Esqueci minha senha...</Texto>
                </div>

                <img src={imgEsueceuSenha} height='180px' width='280px' alt='' />
                <div id='msgTemp'>
                    {mensagem && <Texto peso='16' tamanho='16px' cor='#ff0000'>{mensagem}</Texto>}
                </div>
                <form id='formularioEsquceuSenha' onSubmit={handleSubmit}>
                    <InputsEBotao
                        placeholder='E-mail'
                        className='inputs'
                        largura='310px'
                        altura='30px'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputsEBotao
                        placeholder='Nova Senha'
                        className='inputs'
                        largura='310px'
                        altura='30px'
                        type='password'
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                    />
                    <InputsEBotao
                        placeholder='Confirmar senha'
                        className='inputs'
                        largura='310px'
                        altura='30px'
                        type='password'
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                    <input type="submit" id='Submit' value='Enviar' />
                </form>
            </Card>
        </div>
    );
}
