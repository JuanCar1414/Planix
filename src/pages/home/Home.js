import { useParams } from 'react-router-dom';
import Card from '../../componentes/Card';
import Header from '../../componentes/Header/Header';
import Texto from '../../componentes/Texto';
import addLogo from '../../imgs/addLogo.png';
import logoTarefa from '../../imgs/tarefaLogo.png';
import logoCarteira from '../../imgs/carteiraLogo.png';
import logoDinheiro from '../../imgs/dinheiroLogo.png';
import logoCalendario from '../../imgs/calendarioLogo.png';
import './Home.css';
import { Link } from 'react-router-dom';
import PerfilModal from '../../componentes/Modals/PerfilModal.js';  // Importando o modal de perfil
import { useState, useEffect } from 'react';
import AddGanhoGastoModal from '../../componentes/Modals/AddGanhoGastoModal.js';
import AddTarefaModal from '../../componentes/Modals/AddTarefaModal.js';
import AddMetaModal from '../../componentes/Modals/AddMetaModal.js';
import Calendar from '../../componentes/Modals/CalendarioModal.js';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Home() {
    const { NomeUsuario } = useParams();  // Captura o nome diretamente da URL
    const [nome, setNome] = useState('');

    const [activeTab, setActiveTab] = useState('tarefas'); // Estado para rastrear o botão ativo

    const [currentDate, setCurrentDate] = useState(new Date()); // Estado para a data atual

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    // Função para formatar a data
    const formatDate = (date) => {
        return format(date, "EEEE, dd 'de' MMMM", { locale: ptBR });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 86400000); // 24 horas

        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        // Verifica se o nome vem da URL ou do localStorage
        if (NomeUsuario) {
            setNome(NomeUsuario);  // Nome vindo da URL
        } else {
            const nomeLocal = localStorage.getItem('NomeUsuario');  // Verifica no localStorage
            if (nomeLocal) {
                setNome(nomeLocal);
            } else {
                setNome('Usuário');  // Valor padrão se nada for encontrado
            }
        }
    }, [NomeUsuario]);

    const [openModalAddGan, setOpenModalAddGan] = useState(false);
    const [openModalAddTar, setOpenModalAddTar] = useState(false);
    const [openModalAddMeta, setOpenModalAddMeta] = useState(false);
    const [openModalCalendar, setOpenModalCalendar] = useState(false);
    const [openPerfilModal, setOpenPerfilModal] = useState(false); // Estado para controlar a abertura do modal de perfil

    // Função para fechar o modal de "Adicionar Gasto/Ganho"
    const handleCloseModalAddGan = () => {
        setOpenModalAddGan(false);
    };

    const handleCloseModalAddTar = () => {
        setOpenModalAddTar(false);
    };

    // Função para fechar o modal de perfil
    const handleClosePerfilModal = () => {
        setOpenPerfilModal(false);
    };

    const handleCloseMetaModal = () => {
        setOpenModalAddMeta(false);
    };

    const handleCloseCalendarModal = () => {
        setOpenModalCalendar(false);
    };


    return (
        <>
            <Header />
            <div id="corpoHome">
                <div id="textos">
                    <Texto tamanho="16px" className="dataHoraNomeHome">{formatDate(currentDate)}</Texto>
                    {/* Exibindo o nome do usuário capturado da URL */}
                    <Texto tamanho="32px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Boa tarde, {nome}</Texto>
                </div>
                <div id="mainHome">
                    <Card altura="300px" largura="1050px" cor="#fefefe" borda="solid #d1d1d1 2px;" radius="50px" id="cardTarefa">
                        <div id="txtTarefa">
                            <Texto tamanho="32px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Tarefas e Metas</Texto>
                            <div className="tabsContainer">
                                <div
                                    className={`tab ${activeTab === 'tarefas' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('tarefas')}
                                >
                                    <Texto tamanho="16px" cor="#2D5186">Tarefas</Texto>
                                </div>
                                <div
                                    className={`tab ${activeTab === 'metas' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('metas')}
                                >
                                    <Texto tamanho="16px" cor="#2D5186">Metas</Texto>
                                </div>
                            </div>
                        </div>
                        <div className='campoDeModificacaoPai'>
                            {activeTab === 'tarefas' &&
                                <div className='campoDeModificacao'>
                                    <div className="opcTarefas">
                                        <div id="iconTarefa">
                                            <img src={addLogo} height="23px" width="23px" alt="" />
                                            <button onClick={() => setOpenModalAddTar(true)} id='btnPlanner'>
                                                <Texto tamanho="20px" cor="#000">Adicionar Tarefa</Texto>
                                            </button>

                                        </div>
                                    </div>
                                    <div className="opcTarefas">
                                        <div id="iconTarefaAtzDeBaixo">
                                            <div id='txtMetasTarefas'>
                                                <img src={logoTarefa} height="23px" width="23px" alt="" />
                                                <button onClick={() => setOpenModalAddTar(true)} id='btnAddGanhoGasto'>
                                                    <Texto tamanho="20px" cor="#000">Vizualizar Tarefa</Texto>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opcTarefas">
                                        <div id="iconTarefa">
                                            <img src={logoCalendario} height="23px" width="23px" alt="" />
                                            <button onClick={() => setOpenModalCalendar(true)} id='btnPlanner'>
                                                <Texto tamanho="20px" cor="#000">Vizualizar Candario</Texto>
                                            </button>

                                        </div>
                                    </div>
                                </div>}
                            {activeTab === 'metas' &&
                                <div className='campoDeModificacao'>
                                    <div className="opcTarefas">
                                        <div id="iconTarefa">
                                            <img src={addLogo} height="23px" width="23px" alt="" />
                                            <button onClick={() => setOpenModalAddMeta(true)} id='btnPlanner'>
                                                <Texto tamanho="20px" cor="#000">Adicionar Metas</Texto>
                                            </button>

                                        </div>
                                    </div>
                                    <div className="opcTarefas">
                                        <div id="iconTarefaAtzDeBaixo">
                                            <div id='txtMetasTarefas'>
                                                <img src={logoTarefa} height="23px" width="23px" alt="" />
                                                <button onClick={() => setOpenModalAddMeta(true)} id='btnAddGanhoGasto'>
                                                    <Texto tamanho="20px" cor="#000">Vizualizar Metas</Texto>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opcTarefas">
                                        <div id="iconTarefa">
                                            <img src={logoCalendario} height="23px" width="23px" alt="" />
                                            <button onClick={() => setOpenModalCalendar(true)} id='btnPlanner'>
                                                <Texto tamanho="20px" cor="#000">Vizualizar Candario</Texto>
                                            </button>

                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </Card>
                    <div id="txtTarefa">
                        <Texto tamanho="32px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Minhas Tarefas e Metas Concluidas</Texto>

                    </div>
                    <div id="divisao">
                        <div id="linhaDiv"></div>
                    </div>
                    <div id="mainEcono">
                        <div id="textos">
                            <Texto tamanho="32px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Suas Economias</Texto>
                            <Texto tamanho="16px" className="dataHoraNomeHome">Organize-as aqui</Texto>
                        </div>
                        <Card altura="300px" largura="1050px" cor="#fefefe" borda="solid #d1d1d1 2px;" radius="50px" id="cardEconomic">
                            <div id="boxDeEco">
                                <div id="headerEco">
                                    <Texto tamanho="32px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Gastos</Texto>
                                    <img src={logoCarteira} height="35px" width="35px" alt="" />
                                </div>
                                <div id="corpoEco">
                                    <div id="boxDeValores">
                                        <div id="txtsGastosVencimentos">
                                            <Texto tamanho="18px">Principal receita</Texto>
                                            <Link to={null} className="txtCentro">
                                                <Texto tamanho="15px" cor="#2D5186">Vizualizar/Adicionar vencimentos</Texto>
                                            </Link>
                                        </div>
                                        <div id="boxDeValoresConjunto">
                                            <div id="boxDeValoresHeaderLgnd">
                                                <Texto tamanho="15px" cor="#fff" peso="bolder">Salário</Texto>
                                                <Texto tamanho="15px" cor="#fff" peso="bolder">Ganhos</Texto>
                                            </div>
                                            <div id="boxDeValoresHeader">
                                                <Texto tamanho="15px" cor="#000">15042</Texto>
                                                <Texto tamanho="15px" cor="#000">17% - 1231</Texto>
                                            </div>
                                        </div>
                                        <Texto tamanho="18px">Principal receita</Texto>
                                        <div id="boxDeValoresHeaderGst">
                                            <Texto tamanho="26px" cor="#2D5186" className="dataHoraNomeHome" peso="400">Stream</Texto>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="boxDeEco">
                                <div id="headerEco">
                                    <Texto tamanho="32px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Ganhos</Texto>
                                    <img src={logoDinheiro} height="35px" width="35px" alt="" />
                                </div>
                                <div id="corpoEco">
                                    <div id="boxDeValores">
                                        <div id="txtsGastosVencimentos">
                                            <Texto tamanho="18px">Principal receita</Texto>
                                            <button onClick={() => setOpenModalAddGan(true)} className="txtCentro" id='btnAddGanhoGasto'>
                                                <Texto tamanho="15px" cor="#2D5186">Adicionar Gasto/Ganho</Texto>
                                            </button>
                                        </div>
                                        <div id="boxDeValoresConjunto">
                                            <div id="boxDeValoresHeaderLgnd">
                                                <Texto tamanho="15px" cor="#fff" peso="bolder">Salário</Texto>
                                                <Texto tamanho="15px" cor="#fff" peso="bolder">Ganhos</Texto>
                                            </div>
                                            <div id="boxDeValoresHeader">
                                                <Texto tamanho="15px" cor="#000">15042</Texto>
                                                <Texto tamanho="15px" cor="#000">17% - 1231</Texto>
                                            </div>
                                        </div>
                                        <Texto tamanho="18px">Principal receita</Texto>
                                        <div id="boxDeValoresHeaderGst">
                                            <Texto tamanho="26px" cor="#2D5186" className="dataHoraNomeHome" peso="400">Stream</Texto>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Modal de Perfil sendo renderizado condicionalmente */}
            {openPerfilModal && <PerfilModal nome={nome} isOpen={openPerfilModal} onClose={handleClosePerfilModal} />}

            {/* Modal de Adicionar Gasto/Ganho */}
            {openModalAddGan && <AddGanhoGastoModal isOpen={openModalAddGan} onClose={handleCloseModalAddGan} />}

            {openModalAddTar && <AddTarefaModal isOpen={openModalAddTar} onClose={handleCloseModalAddTar} />}

            {openModalAddMeta && <AddMetaModal isOpen={openModalAddMeta} onClose={handleCloseMetaModal} />}

            {openModalCalendar && <Calendar isOpen={openModalCalendar} onClose={handleCloseCalendarModal} />}
        </>
    );
}
