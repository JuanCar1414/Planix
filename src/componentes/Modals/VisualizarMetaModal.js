import { useState, useEffect } from "react";
import Card from "../Card";
import Texto from "../Texto";
import logoLixo from "../../imgs/logoLixo.png";
import { useParams } from "react-router-dom";
import { format, addDays } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

export default function VisualizarTarefaModal({ isOpen, onClose }) {
    const { NomeUsuario } = useParams(); // Captura o nome diretamente da URL
    const [metas, setMetas] = useState([]); // Estado para armazenar as metas
    const [loading, setLoading] = useState(true); // Estado de carregamento

    useEffect(() => {
        if (isOpen) {
            // Apenas busca as metas quando o modal está aberto
            const fetchMetas = async () => {
                try {
                    const response = await fetch(`https://01d75781-3aac-4da8-840e-f329c0f1b732-00-wk2is7bchmpu.worf.replit.dev/${NomeUsuario}/ver-meta`);
                    const data = await response.json();
                    if (response.ok) {
                        setMetas(data.Metas); // Armazena as metas no estado
                    } else {
                        alert('Erro ao buscar metas');
                    }
                } catch (error) {
                    console.error("Erro ao carregar metas:", error);
                    alert("Erro ao carregar metas");
                } finally {
                    setLoading(false); // Finaliza o carregamento
                }
            };
            fetchMetas();
        }
    }, [isOpen, NomeUsuario]);

    // Função para alternar a conclusão da meta
    const toggleConclusao = (index) => {
        setMetas((prevMetas) =>
            prevMetas.map((meta, i) =>
                i === index ? { ...meta, concluida: !meta.concluida } : meta
            )
        );
    };

    const formatarData = (data) => {
        // Converte a data para o fuso horário UTC considerando o fuso horário de São Paulo
        const dataUtc = fromZonedTime(data, 'America/Sao_Paulo');

        // Adiciona um dia à data
        const dataComUmDiaAdicional = addDays(dataUtc, 1);

        // Formata a data para o formato desejado
        return format(dataComUmDiaAdicional, 'dd/MM/yyyy');
    };
    // Função para excluir a meta
    const handleDeleteMeta = async (tarefaId) => {
        try {
            const response = await fetch(
                `https://01d75781-3aac-4da8-840e-f329c0f1b732-00-wk2is7bchmpu.worf.replit.dev/${NomeUsuario}/deletar-meta`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: tarefaId }), // Envia o ID da meta no corpo.
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log('Resposta do servidor:', data);

                // Remove a meta localmente
                setMetas((prevMetas) =>
                    prevMetas.filter((meta) => meta._id !== tarefaId)
                );

                alert('Metas excluída com sucesso!');
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
        nomeDescricaoMeta: {
            height: "85%",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            marginLeft: "6px"
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
                            Visualizar metas
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
