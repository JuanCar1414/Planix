import { useState, useEffect } from "react";
import Card from "../Card";
import Texto from "../Texto";
import logoLixo from "../../imgs/logoLixo.png";
import { useParams } from "react-router-dom";
import { format, addDays } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

export default function VisualizarMetaModal({ isOpen, onClose }) {
    const { NomeUsuario } = useParams();
    const [metas, setMetas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            const fetchMetas = async () => {
                try {
                    const response = await fetch(`https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/${NomeUsuario}/ver-meta`);
                    const data = await response.json();
                    console.log('Resposta da API:', data); // Verificar estrutura da resposta

                    if (response.ok) {
                        // Verifica se data.Metas existe e é um array
                        if (data && Array.isArray(data.Metas)) {
                            const storedConcluidas = JSON.parse(localStorage.getItem("concluidas")) || {};
                            const metasComEstado = data.Metas.map(meta => ({
                                ...meta,
                                concluida: storedConcluidas[meta._id] || meta.concluida,
                            }));
                            setMetas(metasComEstado);
                        } else {
                            alert('Não foi possível encontrar as metas ou o formato está incorreto.');
                        }
                    } else {
                        alert('Erro ao buscar metas');
                    }
                } catch (error) {
                    console.error("Erro ao carregar metas:", error);
                    alert("Erro ao carregar metas");
                } finally {
                    setLoading(false);
                }
            };
            fetchMetas();
        }
    }, [isOpen, NomeUsuario]);

    const toggleConclusao = async (index) => {
        setMetas((prevMetas) => {
            const newMetas = prevMetas.map((meta, i) =>
                i === index ? { ...meta, concluida: !meta.concluida } : meta
            );

            const updatedConcluidas = newMetas.reduce((acc, meta) => {
                acc[meta._id] = meta.concluida;
                return acc;
            }, {});

            localStorage.setItem("concluidas", JSON.stringify(updatedConcluidas));

            // Atualiza o status no servidor com o campo correto 'Concluida'
            const meta = newMetas[index];
            fetch(`https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/${NomeUsuario}/update-meta/${meta._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    concluida: meta.concluida  // Agora envia o valor atual da variável 'concluida'
                }),
            });

            return newMetas;
        });
    };

    const formatarData = (data) => {
        const dataUtc = fromZonedTime(data, 'America/Sao_Paulo');
        const dataComUmDiaAdicional = addDays(dataUtc, 1);
        return format(dataComUmDiaAdicional, 'dd/MM/yyyy');
    };

    const handleDeleteMeta = async (metaId) => {
        try {
            const response = await fetch(
                `https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/${NomeUsuario}/deletar-meta`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: metaId }),
                }
            );

            if (response.ok) {
                setMetas((prevMetas) =>
                    prevMetas.filter((meta) => meta._id !== metaId)
                );
            } else {
                const errorText = await response.text();
                console.error('Erro no backend:', errorText);
                alert(`Erro ao excluir a meta: ${errorText}`);
            }
        } catch (error) {
            console.error('Erro ao tentar excluir a meta:', error);
            alert('Erro ao tentar excluir a meta.');
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
        meta: {
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
        return <Texto tamanho="16px" cor="#2D5186">Carregando metas...</Texto>;
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
                        {metas.length > 0 ? (
                            metas.map((meta, index) => (
                                <div key={index} style={styles.meta}>
                                    <div style={styles.tarefaEsquerda}>
                                        <input
                                            type="checkbox"
                                            checked={meta.concluida}
                                            onChange={() => toggleConclusao(index)}
                                            style={styles.tarefaCheckbox}
                                        />
                                        <div style={styles.nomeDescricaoMeta}>
                                            <Texto tamanho="16px" style={styles.tarefaTexto(meta.concluida)}>
                                                Nome: {meta.Nome}
                                            </Texto>
                                            <Texto tamanho="16px" style={styles.tarefaTexto(meta.concluida)}>
                                                Descricao: {meta.Descricao}
                                            </Texto>
                                        </div>
                                    </div>
                                    <div style={styles.tarefaDireita}>
                                        <Texto tamanho="14px" cor="#2D5186" style={styles.tarefaTexto(meta.concluida)}>
                                            {formatarData(meta.Dia)} - {meta.Horario}
                                        </Texto>
                                        <img
                                            src={logoLixo}
                                            height="20px"
                                            alt="Lixeira"
                                            onClick={() => handleDeleteMeta(meta._id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Texto tamanho="16px" cor="#2D5186">Não há metas cadastradas.</Texto>
                        )}
                    </div>
                </Card>
            </div>
        )
    );
}
