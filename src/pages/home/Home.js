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
import VisualizarMetaModal from '../../componentes/Modals/VisualizarMetaModal.js';
import VisualizarTarefaModal from '../../componentes/Modals/VisualizarTarefaModal.js';
import logoLixo from "../../imgs/logoLixo.png";

export default function Home() {
    const { NomeUsuario } = useParams();  // Captura o nome diretamente da URL
    const [nome, setNome] = useState('');
    const [tarefas, setTarefas] = useState([]);  // Estado para armazenar as tarefas
    const [metas, setMetas] = useState([]);
    const [ganhos, setGanhos] = useState([]);
    const [gastos, setGastos] = useState([]);

    const [maiorGasto, setMaiorGasto] = useState(null);
    const [somaGastos, setSomaGastos] = useState(null);
    const [erro, setErro] = useState(null);

    const [maiorGanho, setMaiorGanho] = useState(null);
    const [somaGanhos, setSomaGanhos] = useState(null);


    useEffect(() => {
        // Requisição para obter o maior gasto
        fetch(`https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/somar-gastos/${NomeUsuario}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.totalGastos) {
                    setSomaGastos(data.totalGastos);
                } else {
                    setErro(data.message || "Erro ao carregar soma dos gastos");
                }
            })
            .catch((err) => setErro("Erro ao carregar soma dos gastos"));

        fetch(`https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/maior-gasto/${NomeUsuario}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.maiorGasto) {
                    setMaiorGasto(data.maiorGasto);
                } else {
                    setErro(data.message || "Erro ao carregar maior gasto");
                }
            })
            .catch((err) => setErro("Erro ao carregar maior gasto"));
    }, [NomeUsuario]);

    useEffect(() => {
        // Requisição para obter a soma dos ganhos
        fetch(`https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/somar-ganhos/${NomeUsuario}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.totalGanhos) {
                    setSomaGanhos(data.totalGanhos);
                } else {
                    setErro(data.message || "Erro ao carregar soma dos ganhos");
                }
            })
            .catch((err) => setErro("Erro ao carregar soma dos ganhos"));

        // Requisição para obter o maior ganho
        fetch(`https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/maior-ganho/${NomeUsuario}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.maiorGanho) {
                    setMaiorGanho(data.maiorGanho);
                } else {
                    setErro(data.message || "Erro ao carregar maior ganho");
                }
            })
            .catch((err) => setErro("Erro ao carregar maior ganho"));
    }, [NomeUsuario]);


    const [activeTab, setActiveTab] = useState('tarefas'); // Estado para rastrear o botão ativo

    const [currentDate, setCurrentDate] = useState(new Date()); // Estado para a data atual

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    // Função para formatar a data
    const formatDate = (date) => {
        return format(date, "EEEE, dd 'de' MMMM", { locale: ptBR });
    };

    const handleDeleteGanho = async (ganhoId) => {
        try {
            const response = await fetch(
                `https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/${NomeUsuario}/deletar-ganhos`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: ganhoId }), // Enviar o _id completo do ganho
                }
            );

            console.log('Resposta da API:', response); // Verifique a resposta da API

            if (response.ok) {
                const responseData = await response.json(); // Verificar a resposta do backend
                console.log('Resposta do Backend:', responseData);

                if (responseData.massage === "Item removido com sucesso") {
                    setMetas((prevMetas) =>
                        prevMetas.filter((ganho) => ganho._id !== ganhoId)
                    );
                    alert('Ganho excluído com sucesso!');
                } else {
                    alert(`Erro: ${responseData.massage}`);
                }
            } else {
                const errorText = await response.text();
                console.error('Erro no backend:', errorText);
                alert(`Erro ao excluir o ganho: ${errorText}`);
            }
        } catch (error) {
            console.error('Erro ao tentar excluir o ganho:', error);
            alert('Erro ao tentar excluir o ganho.');
        }
    };



    useEffect(() => {
        const fetchGanhos = async () => {
            try {
                const response = await fetch(`https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/${NomeUsuario}/ver-ganhos`);
                const data = await response.json();

                if (response.ok) {
                    setGanhos(data.Ganhos || []); // Atualize o estado com os ganhos retornados
                } else {
                    console.error("Erro no servidor:", data.message);
                }
            } catch (err) {
                console.error("Erro ao buscar ganhos:", err);
            }
        };

        fetchGanhos();

        const interval = setInterval(() => {
            fetchGanhos();
        }, 10000); // Atualiza a cada 10 segundos

        return () => clearInterval(interval);
    }, [NomeUsuario]);

    const handleDeleteGasto = async (gastoId) => {
        try {
            const response = await fetch(
                `https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/${NomeUsuario}/deletar-gasto`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: gastoId }), // Enviar o _id completo do gasto
                }
            );

            console.log('Resposta da API:', response); // Verifique a resposta da API

            if (response.ok) {
                const responseData = await response.json(); // Verificar a resposta do backend
                console.log('Resposta do Backend:', responseData);

                if (responseData.massage === "Item removido com sucesso") {
                    setGastos((prevGastos) =>
                        prevGastos.filter((gasto) => gasto._id !== gastoId)
                    );
                    alert('Gasto excluído com sucesso!');
                } else {
                    alert(`Erro: ${responseData.massage}`);
                }
            } else {
                const errorText = await response.text();
                console.error('Erro no backend:', errorText);
                alert(`Erro ao excluir o gasto: ${errorText}`);
            }
        } catch (error) {
            console.error('Erro ao tentar excluir o gasto:', error);
            alert('Erro ao tentar excluir o gasto.');
        }
    };

    useEffect(() => {
        const fetchGastos = async () => {
            try {
                const response = await fetch(`https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/${NomeUsuario}/ver-gastos`);
                const data = await response.json();

                if (response.ok) {
                    setGastos(data.Gastos || []); // Atualize o estado com os gastos retornados
                } else {
                    console.error("Erro no servidor:", data.message);
                }
            } catch (err) {
                console.error("Erro ao buscar gastos:", err);
            }
        };

        fetchGastos();

        const interval = setInterval(() => {
            fetchGastos();
        }, 10000); // Atualiza a cada 10 segundos

        return () => clearInterval(interval);
    }, [NomeUsuario]);


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 86400000); // 24 horas

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const response = await fetch(`https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/${NomeUsuario}/ver-tarefa`);
                const data = await response.json();

                if (response.ok) {
                    const tarefasConcluidas = data.Tarefa.filter(tarefa => tarefa.Concluida); // Filtrar tarefas concluídas
                    setTarefas(tarefasConcluidas); // Atualizar estado
                } else {
                    console.error("Erro no servidor:", data.message);
                }
            } catch (err) {
                console.error("Erro ao buscar tarefas:", err);
            }
        };

        // Chamar a função imediatamente ao carregar
        fetchTarefas();

        // Configurar atualização periódica
        const interval = setInterval(() => {
            fetchTarefas();
        }, 10000); // Atualiza a cada 10 segundos (ajuste conforme necessário)

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, [NomeUsuario]); // Executa novamente se o `NomeUsuario` mudar

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


    useEffect(() => {
        const fetchMetas = async () => {
            try {
                const response = await fetch(`https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/${NomeUsuario}/ver-meta`);
                const data = await response.json();

                if (response.ok) {
                    // Verificar se Metas é um array antes de tentar filtrar
                    if (Array.isArray(data.Metas)) {
                        const metasConcluidas = data.Metas.filter(meta => meta.Concluida); // Filtrar metas concluídas
                        setMetas(metasConcluidas); // Atualizar estado
                    } else {
                        console.error("Metas não é um array:", data.Metas);
                        setMetas([]); // Caso não seja um array, garantir que metas esteja vazio
                    }
                } else {
                    console.error("Erro no servidor:", data.message);
                }
            } catch (err) {
                console.error("Erro ao buscar metas:", err);
            }
        };

        fetchMetas();

        const interval = setInterval(() => {
            fetchMetas();
        }, 10000); // Atualiza a cada 10 segundos

        return () => clearInterval(interval);
    }, [NomeUsuario]); // Executa novamente se o `NomeUsuario` mudar



    const [openModalAddGan, setOpenModalAddGan] = useState(false);
    const [openModalAddTar, setOpenModalAddTar] = useState(false);
    const [openModalAddMeta, setOpenModalAddMeta] = useState(false);
    const [openModalCalendar, setOpenModalCalendar] = useState(false);
    const [openModalVisualizarTarefa, setOpenModalVisualizarTarefa] = useState(false);
    const [openModalVisualizarMeta, setOpenModalVisualizarMeta] = useState(false);
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

    const handleCloseVisualizarTarefaModal = () => {
        setOpenModalVisualizarTarefa(false);
    };

    const handleCloseVisualizarMetaModal = () => {
        setOpenModalVisualizarMeta(false);
    };

    return (
        <>
            <Header />
            <div id="corpoHome">
                <div id="textos">
                    <Texto tamanho="16px" className="dataHoraNomeHome">{formatDate(currentDate)}</Texto>
                    {/* Exibindo o nome do usuário capturado da URL */}
                    <Texto tamanho="32px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Ola, {nome}</Texto>
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
                                                <button onClick={() => setOpenModalVisualizarTarefa(true)} id='btnAddGanhoGasto'>
                                                    <Texto tamanho="20px" cor="#000">Vizualizar Tarefas</Texto>
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
                                                <button onClick={() => setOpenModalVisualizarMeta(true)} id='btnAddGanhoGasto'>
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
                    <div id="txtTarefaConcluida">
                        <Texto tamanho="32px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Minhas Tarefas e Metas Concluidas</Texto>
                        <div id='tarefasMetasConcluidas'>
                            {tarefas.length > 0 ? (
                                tarefas.map(tarefa => (
                                    <div key={tarefa._id} className="tarefaConcluida" id='tarefaConcluida'>
                                        <img src={logoTarefa} height="23px" width="23px" alt="" />
                                        <Texto tamanho="22px" className="dataHoraNomeHome" cor="#2D5186" peso="nromal">{tarefa.Nome}</Texto>
                                        <div id='descricaoTarefaConcluida'>
                                            <Texto tamanho="18px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Descricao da Tarefa:</Texto>
                                            <Texto tamanho="18px">{tarefa.Descricao}</Texto>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Texto tamanho="18px" cor="#2D5186">Nenhuma tarefa concluída encontrada.</Texto>
                            )}
                        </div>
                        <div id='tarefasMetasConcluidas'>
                            {metas.length > 0 ? (
                                metas.map(metas => (
                                    <div key={metas._id} className="tarefaConcluida" id='tarefaConcluida'>
                                        <img src={logoTarefa} height="23px" width="23px" alt="" />
                                        <Texto tamanho="22px" className="dataHoraNomeHome" cor="#2D5186" peso="normal">{metas.Nome}</Texto>
                                        <div id='descricaoTarefaConcluida'>
                                            <Texto tamanho="18px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Descricao da Meta:</Texto>
                                            <Texto tamanho="18px">{metas.Descricao}</Texto>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Texto tamanho="18px" cor="#2D5186">Nenhuma meta concluída encontrada.</Texto>
                            )}
                        </div>

                    </div>


                    <div id="divisao">
                        <div id="linhaDiv"></div>
                    </div>


                    <div id="mainEcono">
                        <div id="textos">
                            <Texto tamanho="32px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Suas Economias</Texto>
                            <Texto tamanho="16px" className="dataHoraNomeHome">Organize-as aqui</Texto>
                        </div>
                        <div id="boxDeEco">
                            <div id="corpoEco">
                                <div id="headerEco">
                                    <Texto tamanho="32px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Gastos</Texto>
                                    <img src={logoCarteira} height="35px" width="35px" alt="" />
                                </div>

                                <div id="boxDeValores">
                                    <div id="txtsGastosVencimentos">
                                        <Texto tamanho="18px">Gastos:</Texto>
                                    </div>
                                    <div className="corpoAddTarefa">
                                        {gastos.length > 0 ? (
                                            gastos.map((gasto, index) => (
                                                <div key={index} className="gastoMeta">
                                                    <div className="gastoEsquerda">
                                                        <div className="gastoDescricaoMeta">
                                                            {/* Linha Nome */}
                                                            <div className="gastoInfoLinha">
                                                                <Texto tamanho="20px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                                    Nome:
                                                                </Texto>
                                                                <Texto tamanho="16px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`}>
                                                                    {gasto.Nome}
                                                                </Texto>
                                                            </div>

                                                            {/* Linha Mês */}
                                                            <div className="gastoInfoLinha">
                                                                <Texto tamanho="20px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                                    Mês:
                                                                </Texto>
                                                                <Texto tamanho="16px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} >
                                                                    {gasto.Mes}
                                                                </Texto>
                                                            </div>

                                                            {/* Linha Descrição */}
                                                            <div className="gastoInfoLinha">
                                                                <Texto tamanho="20px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                                    Descrição:
                                                                </Texto>
                                                                <Texto tamanho="16px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} >
                                                                    {gasto.Descricao}
                                                                </Texto>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="gastoDireita">
                                                        {/* Linha Valor */}
                                                        <div className="gastoInfoLinha">
                                                            <Texto tamanho="20px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                                Valor:
                                                            </Texto>
                                                            <Texto tamanho="16px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} >
                                                                R$ {gasto.Valor}
                                                            </Texto>
                                                        </div>

                                                        {/* Lixeira */}
                                                        <img
                                                            src={logoLixo}
                                                            height="20px"
                                                            width="20px"
                                                            alt="Lixeira"
                                                            onClick={() => handleDeleteGasto(gasto._id)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <Texto tamanho="16px" cor="#2D5186">Não há gastos cadastrados.</Texto>
                                        )}
                                    </div>

                                    <div className="card-container">
                                        <div className="card-title"><Texto tamanho="28px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                            Maior Gasto:
                                        </Texto></div>
                                        <div className="card-value">
                                            {maiorGasto ? (
                                                <>
                                                    <div>
                                                        <Texto tamanho="20px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                            Nome:
                                                        </Texto>
                                                        <Texto tamanho="16px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} >
                                                            {maiorGasto.Nome}
                                                        </Texto>
                                                    </div>
                                                    <div>
                                                        <Texto tamanho="20px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                            Valor:
                                                        </Texto>
                                                        <Texto tamanho="16px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} >
                                                            {maiorGasto.Valor}
                                                        </Texto>
                                                    </div>
                                                </>
                                            ) : erro ? (
                                                <p>{erro}</p>
                                            ) : (
                                                'Carregando...'
                                            )}
                                        </div>
                                    </div>

                                    <div className="card-container">
                                        <div className="card-title"><Texto tamanho="28px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                            Soma dos Gastos:
                                        </Texto></div>
                                        <div className="card-value">
                                            <Texto tamanho="26px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} >
                                                {somaGastos ? `R$ ${somaGastos}` : erro ? erro : 'Carregando...'}
                                            </Texto>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="corpoEco">
                                <div id="headerEco">
                                    <Texto tamanho="32px" className="dataHoraNomeHome" cor="#2D5186" peso="500">Ganhos</Texto>
                                    <img src={logoDinheiro} height="35px" width="35px" alt="" />
                                </div>

                                <div id="boxDeValores">
                                    <div id="txtsGastosVencimentos">
                                        <Texto tamanho="18px">Ganhos:</Texto>
                                        <button onClick={() => setOpenModalAddGan(true)} className="txtCentro" id='btnAddGanhoGasto'>
                                            <Texto tamanho="15px" cor="#2D5186">Adicionar Gasto/Ganho</Texto>
                                        </button>
                                    </div>
                                    <div className="corpoAddTarefa">
                                        {ganhos.length > 0 ? (
                                            ganhos.map((ganho, index) => (
                                                <div key={index} className="gastoMeta">
                                                    <div className="gastoEsquerda">
                                                        <div className="gastoDescricaoMeta">
                                                            {/* Linha Nome */}
                                                            <div className="gastoInfoLinha">
                                                                <Texto tamanho="20px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                                    Nome:
                                                                </Texto>
                                                                <Texto tamanho="16px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} >
                                                                    {ganho.Nome}
                                                                </Texto>
                                                            </div>

                                                            {/* Linha Descrição */}
                                                            <div className="gastoInfoLinha">
                                                                <Texto tamanho="20px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                                    Descrição:
                                                                </Texto>
                                                                <Texto tamanho="16px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`}>
                                                                    {ganho.Descricao}
                                                                </Texto>
                                                            </div>

                                                            {/* Linha Mês */}
                                                            <div className="gastoInfoLinha">
                                                                <Texto tamanho="20px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                                    Mês:
                                                                </Texto>
                                                                <Texto tamanho="16px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} >
                                                                    {ganho.Mes}
                                                                </Texto>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="gastoDireita">
                                                        {/* Linha Valor */}
                                                        <div className="gastoInfoLinha">
                                                            <Texto tamanho="20px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                                Valor:
                                                            </Texto>
                                                            <Texto tamanho="16px" className={`gastoTexto ${false ? 'concluida' : 'naoConcluida'}`} >
                                                                R$ {ganho.Valor}
                                                            </Texto>
                                                        </div>

                                                        {/* Lixeira */}
                                                        <img
                                                            src={logoLixo}
                                                            height="20px"
                                                            width="20px"
                                                            alt="Lixeira"
                                                            onClick={() => handleDeleteGanho(ganho._id)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                </div>


                                            ))
                                        ) : (
                                            <Texto tamanho="16px" cor="#2D5186">Não há ganhos cadastrados.</Texto>
                                        )}
                                    </div>


                                    <div className="card-container">
                                        <div className="card-title">
                                            <Texto tamanho="28px" className={`ganhoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                Maior Ganho:
                                            </Texto>
                                        </div>
                                        <div className="card-value">
                                            {maiorGanho ? (
                                                <>
                                                    <div>
                                                        <Texto tamanho="20px" className={`ganhoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                            Nome:
                                                        </Texto>
                                                        <Texto tamanho="16px" className={`ganhoTexto ${false ? 'concluida' : 'naoConcluida'}`}>
                                                            {maiorGanho.Nome}
                                                        </Texto>
                                                    </div>
                                                    <div>
                                                        <Texto tamanho="20px" className={`ganhoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                            Valor:
                                                        </Texto>
                                                        <Texto tamanho="16px" className={`ganhoTexto ${false ? 'concluida' : 'naoConcluida'}`}>
                                                            {maiorGanho.Valor}
                                                        </Texto>
                                                    </div>
                                                </>
                                            ) : erro ? (
                                                <p>{erro}</p>
                                            ) : (
                                                'Carregando...'
                                            )}
                                        </div>
                                    </div>

                                    <div className="card-container">
                                        <div className="card-title">
                                            <Texto tamanho="28px" className={`ganhoTexto ${false ? 'concluida' : 'naoConcluida'}`} cor="#2D5186" peso="500">
                                                Soma dos Ganhos:
                                            </Texto>
                                        </div>
                                        <div className="card-value">
                                            <Texto tamanho="26px" className={`ganhoTexto ${false ? 'concluida' : 'naoConcluida'}`}>
                                                {somaGanhos ? `R$ ${somaGanhos}` : erro ? erro : 'Carregando...'}
                                            </Texto>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Modal de Perfil sendo renderizado condicionalmente */}
            {openPerfilModal && <PerfilModal nome={nome} isOpen={openPerfilModal} onClose={handleClosePerfilModal} />}

            {/* Modal de Adicionar Gasto/Ganho */}
            {openModalAddGan && <AddGanhoGastoModal isOpen={openModalAddGan} onClose={handleCloseModalAddGan} nomeUsuario={NomeUsuario} />}

            {
                openModalAddTar && <AddTarefaModal isOpen={openModalAddTar} onClose={handleCloseModalAddTar}  // Aqui você passa o nome do usuário
                />
            }

            {openModalAddMeta && <AddMetaModal isOpen={openModalAddMeta} onClose={handleCloseMetaModal} />}

            {openModalVisualizarTarefa && <VisualizarTarefaModal isOpen={openModalVisualizarTarefa} onClose={handleCloseVisualizarTarefaModal} />}

            {openModalCalendar && <Calendar isOpen={openModalCalendar} onClose={handleCloseCalendarModal} />}

            {openModalVisualizarMeta && <VisualizarMetaModal isOpen={openModalVisualizarMeta} onClose={handleCloseVisualizarMetaModal} />}
        </>
    );
}
