import { useState, useEffect } from "react";
import Card from "../Card";
import Texto from "../Texto";
import logoLixo from "../../imgs/logoLixo.png";
import { useParams } from "react-router-dom";
import { format, addDays } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

export default function VisualizarTarefaModal({ isOpen, onClose }) {
    const { NomeUsuario } = useParams();
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            const fetchTarefas = async () => {
                try {
                    const response = await fetch(`https://01d75781-3aac-4da8-840e-f329c0f1b732-00-wk2is7bchmpu.worf.replit.dev/${NomeUsuario}/ver-tarefa`);
                    const data = await response.json();
                    if (response.ok) {
                        const storedConcluidas = JSON.parse(localStorage.getItem("concluidas")) || {};
                        const tarefasComEstado = data.Tarefa.map(tarefa => ({
                            ...tarefa,
                            concluida: storedConcluidas[tarefa._id] || tarefa.concluida,
                        }));
                        setTarefas(tarefasComEstado);
                    } else {
                        alert('Erro ao buscar tarefas');
                    }
                } catch (error) {
                    console.error("Erro ao carregar tarefas:", error);
                    alert("Erro ao carregar tarefas");
                } finally {
                    setLoading(false);
                }
            };
            fetchTarefas();
        }
    }, [isOpen, NomeUsuario]);

    const toggleConclusao = async (index) => {
        setTarefas((prevTarefas) => {
            const newTarefas = prevTarefas.map((tarefa, i) =>
                i === index ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
            );

            const updatedConcluidas = newTarefas.reduce((acc, tarefa) => {
                acc[tarefa._id] = tarefa.concluida;
                return acc;
            }, {});

            localStorage.setItem("concluidas", JSON.stringify(updatedConcluidas));

            // Atualiza o status no servidor com o campo correto 'Concluida'
            const tarefa = newTarefas[index];
            fetch(`https://01d75781-3aac-4da8-840e-f329c0f1b732-00-wk2is7bchmpu.worf.replit.dev/${NomeUsuario}/update-tarefa/${tarefa._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    concluida: tarefa.concluida  // Agora envia o valor atual da variável 'concluida'
                }),
            });

            return newTarefas;
        });
    };

    const formatarData = (data) => {
        const dataUtc = fromZonedTime(data, 'America/Sao_Paulo');
        const dataComUmDiaAdicional = addDays(dataUtc, 1);
        return format(dataComUmDiaAdicional, 'dd/MM/yyyy');
    };

    const handleDeleteTarefa = async (tarefaId) => {
        try {
            const response = await fetch(
                `https://01d75781-3aac-4da8-840e-f329c0f1b732-00-wk2is7bchmpu.worf.replit.dev/${NomeUsuario}/deletar-tarefa`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: tarefaId }),
                }
            );

            if (response.ok) {
                setTarefas((prevTarefas) =>
                    prevTarefas.filter((tarefa) => tarefa._id !== tarefaId)
                );
                alert('Tarefa excluída com sucesso!');
            } else {
                const errorText = await response.text();
                console.error('Erro no backend:', errorText);
                alert(`Erro ao excluir a tarefa: ${errorText}`);
            }
        } catch (error) {
            console.error('Erro ao tentar excluir a tarefa:', error);
            alert('Erro ao tentar excluir a tarefa.');
        }
    };

    const styles = {
        txtAddTarefa: {
            height: "63px",
            width: "90%",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            borderBottom: "2px solid #d1d1d1",
            padding: "0 20px",
        },
        txtTitle: {
            justifySelf: "start",
        },
        headerButton: {
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            fontSize: "25px",
            cursor: "pointer",
            justifySelf: "end",
        },
        tarefa: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "15px 20px",
            borderBottom: "1px solid #ddd",
            width: "100%",
            boxSizing: "border-box",
        },
        tarefaEsquerda: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            width: "70%",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        tarefaDescricao: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "5px",
        },
        tarefaDireita: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            minWidth: "30%",
            flexShrink: 0,
        },
        tarefaTexto: (concluida) => ({
            textDecoration: concluida ? "line-through" : "none",
            color: concluida ? "#aaa" : "#2D5186",
            fontSize: "16px",
            wordWrap: "break-word",
            textAlign: "start",
            margin: "2px"
        }),
        tarefaCheckbox: {
            width: "20px",
            height: "20px",
            cursor: "pointer",
        },
        corpoAddTarefa: {
            height: "85%",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            padding: "8px",
        },
        nomeDescricaoMeta: {
            height: "90%",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            marginLeft: "6px",
            overflowWrap: "break-word",
        },
    };

    if (loading) {
        return <Texto tamanho="16px" cor="#2D5186">Carregando tarefas...</Texto>;
    }

    return (
        isOpen && (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1000,
                }}
            >
                <Card
                    altura="550px"
                    largura="550px"
                    cor="#F8F8F8"
                    borda="solid #d1d1d1 2px"
                    radius="50px"
                    id="cardTarefaAddModal"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1001,
                    }}
                >
                    <div style={styles.txtAddTarefa}>
                        <Texto tamanho="20px" cor="#2D5186" peso="100" style={styles.txtTitle}>
                            Visualizar Tarefas
                        </Texto>
                        <button onClick={onClose} style={styles.headerButton}>
                            <Texto tamanho="26px" cor="#b1b1b1">
                                X
                            </Texto>
                        </button>
                    </div>

                    <div style={styles.corpoAddTarefa}>
                        {tarefas.length > 0 ? (
                            tarefas.map((tarefa, index) => (
                                <div key={index} style={styles.tarefa}>
                                    <div style={styles.tarefaEsquerda}>
                                        <input
                                            type="checkbox"
                                            checked={tarefa.concluida}
                                            onChange={() => toggleConclusao(index)}
                                            style={styles.tarefaCheckbox}
                                        />
                                        <div style={styles.nomeDescricaoMeta}>
                                            <Texto tamanho="16px" style={styles.tarefaTexto(tarefa.concluida)}>
                                                Nome: {tarefa.Nome}
                                            </Texto>
                                            <Texto tamanho="16px" style={styles.tarefaTexto(tarefa.concluida)}>
                                                Descricao: {tarefa.Descricao}
                                            </Texto>
                                        </div>
                                    </div>
                                    <div style={styles.tarefaDireita}>
                                        <Texto tamanho="14px" cor="#2D5186" style={styles.tarefaTexto(tarefa.concluida)}>
                                            {formatarData(tarefa.Dia)} - {tarefa.Horario}
                                        </Texto>
                                        <img
                                            src={logoLixo}
                                            height="20px"
                                            alt="Lixeira"
                                            onClick={() => handleDeleteTarefa(tarefa._id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Texto tamanho="16px" cor="#2D5186">Não há tarefas cadastradas.</Texto>
                        )}
                    </div>
                </Card>
            </div>
        )
    );
}
