import { useState, useEffect } from "react";
import Card from "../Card";
import Texto from "../Texto";
import logoLixo from "../../imgs/logoLixo.png";
import { useParams } from "react-router-dom";

export default function VisualizarTarefaModal({ isOpen, onClose }) {
    const { NomeUsuario } = useParams(); // Captura o nome diretamente da URL
    const [tarefas, setTarefas] = useState([]); // Estado para armazenar as tarefas
    const [loading, setLoading] = useState(true); // Estado de carregamento

    useEffect(() => {
        if (isOpen) {
            // Apenas busca as tarefas quando o modal está aberto
            const fetchTarefas = async () => {
                try {
                    const response = await fetch(`https://01d75781-3aac-4da8-840e-f329c0f1b732-00-wk2is7bchmpu.worf.replit.dev/${NomeUsuario}/ver-tarefa`);
                    const data = await response.json();
                    if (response.ok) {
                        setTarefas(data.Tarefa); // Armazena as tarefas no estado
                    } else {
                        alert('Erro ao buscar tarefas');
                    }
                } catch (error) {
                    console.error("Erro ao carregar tarefas:", error);
                    alert("Erro ao carregar tarefas");
                } finally {
                    setLoading(false); // Finaliza o carregamento
                }
            };
            fetchTarefas();
        }
    }, [isOpen, NomeUsuario]);

    // Função para alternar a conclusão da tarefa
    const toggleConclusao = (index) => {
        setTarefas((prevTarefas) =>
            prevTarefas.map((tarefa, i) =>
                i === index ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
            )
        );
    };

    // Função para excluir a tarefa
    const handleDeleteTarefa = async (tarefaId) => {
        try {
            const response = await fetch(
                `https://01d75781-3aac-4da8-840e-f329c0f1b732-00-wk2is7bchmpu.worf.replit.dev/${NomeUsuario}/deletar-tarefa`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: tarefaId }) // Passando o id da tarefa para deletar
                }
            );
            if (response.ok) {
                // Atualiza a lista local de tarefas removendo a tarefa excluída
                setTarefas((prevTarefas) => prevTarefas.filter(tarefa => tarefa.id !== tarefaId));
                alert('Tarefa excluída com sucesso!');
            } else {
                alert('Erro ao excluir a tarefa!');
            }
        } catch (error) {
            console.error('Erro ao tentar excluir a tarefa:', error);
            alert('Erro ao tentar excluir a tarefa!');
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
            display: "grid",
            gridTemplateColumns: "auto auto",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px 20px",
            borderBottom: "1px solid #ddd",
            width: "100%",
        },
        tarefaEsquerda: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
        },
        tarefaDireita: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "flex-end",
        },
        tarefaTexto: (concluida) => ({
            textDecoration: concluida ? "line-through" : "none",
            color: concluida ? "#aaa" : "#2D5186",
            fontSize: "16px",
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
                                        <Texto tamanho="16px" style={styles.tarefaTexto(tarefa.concluida)}>
                                            {tarefa.Nome}
                                        </Texto>
                                    </div>
                                    <div style={styles.tarefaDireita}>
                                        <Texto tamanho="14px" cor="#2D5186" style={styles.tarefaTexto(tarefa.concluida)}>
                                            {new Date(tarefa.Dia).toLocaleDateString()} - {tarefa.Horario}
                                        </Texto>
                                        <img
                                            src={logoLixo}
                                            height="20px"
                                            alt="Lixeira"
                                            onClick={() => handleDeleteTarefa(tarefa.id)} // Chama a função de exclusão
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
