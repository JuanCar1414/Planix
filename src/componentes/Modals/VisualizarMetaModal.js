import { useState } from "react";
import Card from "../Card";
import Texto from "../Texto";
import Calendar from "./CalendarioModal";
import logoLixo from "../../imgs/logoLixo.png";

export default function VisualizarMetaModal({ isOpen, onClose }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [openModalCalendar, setOpenModalCalendar] = useState(false);

    const [metas, setMetas] = useState([
        { id: 1, nome: "Agendar reunião inicial", concluida: false },
        { id: 2, nome: "Enviar relatório final", concluida: false },
        { id: 3, nome: "Revisar apresentação", concluida: false },
    ]);

    const toggleConclusao = (id) => {
        setMetas((prevMetas) =>
            prevMetas.map((metas) =>
                metas.id === id ? { ...metas, concluida: !metas.concluida } : metas
            )
        );
    };

    const handleCloseCalendarModal = () => {
        setOpenModalCalendar(false);
    };

    const styles = {
        txtAddTarefa: {
            height: "63px",
            width: "90%",
            display: "grid", // Layout em grid para alinhamento
            gridTemplateColumns: "1fr auto", // Duas colunas
            alignItems: "center",
            borderBottom: "2px solid #d1d1d1",
            padding: "0 20px",
        },
        txtTitle: {
            justifySelf: "start", // Título alinhado à esquerda

        },
        headerButton: {
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            fontSize: "25px",
            cursor: "pointer",
            justifySelf: "end", // Botão de fechar alinhado à direita
        },
        tarefa: {
            display: "grid",
            gridTemplateColumns: "auto auto", // Layout em duas colunas para tarefas
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
                    {/* Cabeçalho com título e botão de fechar */}
                    <div style={styles.txtAddTarefa}>
                        <Texto tamanho="20px" cor="#2D5186" peso="100" style={styles.txtTitle}>
                            Visualizar Metas
                        </Texto>
                        <button onClick={onClose} style={styles.headerButton}>
                            <Texto tamanho="26px" cor="#b1b1b1">
                                X
                            </Texto>
                        </button>
                    </div>

                    {/* Corpo das tarefas */}
                    <div style={styles.corpoAddTarefa}>
                        {metas.map((metas) => (
                            <div key={metas.id} style={styles.tarefa}>
                                {/* Lado esquerdo: Checkbox e nome da tarefa */}
                                <div style={styles.tarefaEsquerda}>
                                    <input
                                        type="checkbox"
                                        checked={metas.concluida}
                                        onChange={() => toggleConclusao(metas.id)}
                                        style={styles.tarefaCheckbox}
                                    />
                                    <Texto tamanho="16px" style={styles.tarefaTexto(metas.concluida)}>
                                        {metas.nome}
                                    </Texto>
                                </div>

                                {/* Lado direito: Data e ícone da lixeira */}
                                <div style={styles.tarefaDireita}>
                                    <Texto tamanho="14px" cor="#2D5186">
                                        16/12 - 12:00 PM
                                    </Texto>
                                    <img src={logoLixo} height="20px" alt="Lixeira" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal do calendário, se aberto */}
                    {openModalCalendar && (
                        <Calendar isOpen={openModalCalendar} onClose={handleCloseCalendarModal} />
                    )}
                </Card>
            </div>
        )
    );
}
