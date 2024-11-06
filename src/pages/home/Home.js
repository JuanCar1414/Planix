import Card from '../../componentes/Card';
import Header from '../../componentes/Header/Header';
import Texto from '../../componentes/Texto';
import addLogo from '../../imgs/addLogo.png';
import logoTarefa from '../../imgs/tarefaLogo.png';
import logoCarteira from '../../imgs/carteiraLogo.png';
import logoDinheiro from '../../imgs/dinheiroLogo.png';
import './Home.css';

export default function Home() {
    return (
        <>
            <Header></Header>
            <div id='corpoHome'>
                <div id='textos'>
                    <Texto tamanho='16px' className='dataHoraNomeHome'>Sexta-feira, 11 de outubro</Texto>
                    <Texto tamanho='32px' className='dataHoraNomeHome' cor='#2D5186' peso='500'>Boa tarde, Nicole</Texto>
                </div>
                <div id='mainHome'>
                    <Card altura='300px' largura='1050px' cor='#fefefe' borda='solid #d1d1d1 2px;' radius='50px' id='cardTarefa'>
                        <div id='txtTarefa'>
                            <Texto tamanho='32px' className='dataHoraNomeHome' cor='#2D5186' peso='500'>Minhas tarefas</Texto>
                            <Texto tamanho='18px' className='dataHoraNomeHome'>Organize-as aqui </Texto>
                        </div>
                        <div className='opcTarefas'>
                            <div id='iconTarefa'>
                                <img src={addLogo} height="23px" width="23px" alt="" />
                                <Texto tamanho='20px' cor='#000'>Tarefas</Texto>
                            </div>
                        </div>
                        <div className='opcTarefas'>
                            <div id='iconTarefaAtz'>
                                <img src={logoTarefa} height="23px" width="23px" alt="" />
                                <Texto tamanho='20px' cor='#000'>Marcar Tarefa</Texto>
                            </div>
                        </div>
                    </Card>
                    <div id='mainEcono'>
                        <div id='textos'>
                            <Texto tamanho='32px' className='dataHoraNomeHome' cor='#2D5186' peso='500'>Suas Economias</Texto>
                            <Texto tamanho='16px' className='dataHoraNomeHome'>Organize-as aqui </Texto>
                        </div>
                        <Card altura='300px' largura='1050px' cor='#fefefe' borda='solid #d1d1d1 2px;' radius='50px' id='cardEconomic'>
                            <div id='boxDeEco'>
                                <div id='headerEco'>
                                    <Texto tamanho='32px' className='dataHoraNomeHome' cor='#2D5186' peso='500'>Gastos</Texto>
                                    <img src={logoCarteira} height="35px" width="35px" alt="" />
                                </div>
                                <div id='corpoEco'>

                                </div>
                            </div>
                            <div id='boxDeEco'>
                                <div id='headerEco'>
                                    <Texto tamanho='32px' className='dataHoraNomeHome' cor='#2D5186' peso='500'>Ganhos</Texto>
                                    <img src={logoDinheiro} height="35px" width="35px" alt="" />
                                </div>
                                <div id='corpoEco'></div>
                            </div>
                        </Card>

                    </div>
                </div>
            </div>
        </>
    )
}