import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, startOfDay } from 'date-fns';
import Texto from '../Texto';
import { useParams } from 'react-router-dom';

export default function Calendar({ isOpen, onClose }) {
    const { NomeUsuario } = useParams(); // Pega o nome do usuário diretamente da URL
    const [currentDate, setCurrentDate] = useState(startOfDay(new Date())); // Data atual normalizada
    const [selectedDate, setSelectedDate] = useState(null); // Data selecionada
    const [showModal, setShowModal] = useState(false); // Controla o modal
    const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas por data
    const [metas, setMetas] = useState([]); // Estado para armazenar as metas por data
    const [loading, setLoading] = useState(false); // Indicador de carregamento
    const [error, setError] = useState(null); // Armazena erro, se houver

    // Buscar tarefas e metas para a data selecionada
    useEffect(() => {
        if (selectedDate) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    // Buscando tarefas
                    const tasksResponse = await fetch(
                        `https://01d75781-3aac-4da8-840e-f329c0f1b732-00-wk2is7bchmpu.worf.replit.dev/${NomeUsuario}/ver-tarefa?selectedDate=${selectedDate}`
                    );
                    const tasksData = await tasksResponse.json();

                    // Buscando metas
                    const metasResponse = await fetch(
                        `https://01d75781-3aac-4da8-840e-f329c0f1b732-00-wk2is7bchmpu.worf.replit.dev/${NomeUsuario}/ver-meta?selectedDate=${selectedDate}`
                    );
                    const metasData = await metasResponse.json();
                    console.log("Metas Data:", metasData);

                    if (tasksResponse.ok && metasResponse.ok) {
                        setTasks(tasksData.Tarefa);   // Atualiza as tarefas no estado
                        setMetas(metasData.Metas);    // Atualiza as metas no estado
                    } else {
                        setError('Erro ao buscar tarefas ou metas');
                    }
                } catch (error) {
                    console.error('Erro ao carregar tarefas ou metas:', error);
                    setError('Erro ao carregar tarefas ou metas');
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [selectedDate, NomeUsuario]);

    const startMonth = startOfDay(startOfMonth(currentDate));
    const endMonth = startOfDay(endOfMonth(currentDate));

    const generateMonthDays = () => {
        const startDate = startOfDay(startOfWeek(startMonth));
        const endDate = startOfDay(endOfWeek(endMonth));
        const days = [];
        let date = startDate;

        while (date <= endDate) {
            days.push(date); // Data já está normalizada
            date = startOfDay(addDays(date, 1)); // Incrementa normalizado
        }

        return days;
    };

    const handlePrevMonth = () => {
        const prevMonth = startOfMonth(addDays(startMonth, -1));
        setCurrentDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = startOfMonth(addDays(endMonth, 1));
        setCurrentDate(nextMonth);
    };

    const handleDateClick = (date) => {
        const normalizedDate = startOfDay(date);
        const formattedDate = format(normalizedDate, 'yyyy-MM-dd');
        setSelectedDate(formattedDate); // Define a data selecionada
        setShowModal(true); // Abre o modal
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDate(null);
    };

    const filteredMetas = metas.filter((meta) => {
        // Normaliza as duas datas para o início do dia para garantir que a comparação seja precisa
        const metaDate = startOfDay(new Date(meta.Dia)); // Normaliza a data da meta
        const selectedDateNormalized = startOfDay(new Date(selectedDate)); // Normaliza a data selecionada

        // Comparar as duas datas de forma precisa (sem fusos horários)
        return format(metaDate, 'yyyy-MM-dd') === format(selectedDateNormalized, 'yyyy-MM-dd');
    });


    const styles = {
        calendarContainer: {
            width: '300px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fff',
            fontFamily: "Poppins, sans-serif",
        },
        calendarHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
        },
        headerButton: {
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
        },
        daysGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        dayHeader: {
            padding: '5px',
        },
        calendarGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridGap: '5px',
        },
        calendarCell: {
            padding: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        outsideMonth: {
            color: '#ccc',
        },
        selectedCell: {
            backgroundColor: '#2D5186',
            color: '#fff',
            borderRadius: '50%',
            fontWeight: 'bold',
        },
        modalOverlay: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
        },
        modalContent: {
            backgroundColor: '#fff',
            width: '400px',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        modalTitle: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#2D5186',
            marginBottom: '10px',
            textAlign: 'center',
        },
        taskList: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
            textAlign: 'left',
            fontSize: '16px',
        },
        taskItem: {
            padding: '5px 0',
        },
        metaItem: {
            padding: '5px 0',
        },
        closeButton: {
            alignSelf: 'center',
            backgroundColor: '#2D5186',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
        },
        noTasksMessage: {
            color: '#757575',
            fontStyle: 'italic',
            textDecoration: 'underline',
        },
    };

    return (
        isOpen && (
            <div style={styles.modalOverlay}>
                <div style={styles.calendarContainer}>
                    {/* Cabeçalho e navegação do calendário */}
                    <div style={styles.calendarHeader}>
                        <button style={styles.headerButton} onClick={handlePrevMonth}>◀</button>
                        <Texto tamanho="24px" cor="#2D5186">{format(currentDate, 'MMMM yyyy')}</Texto>
                        <button style={styles.headerButton} onClick={handleNextMonth}>▶</button>
                        <button onClick={onClose} style={styles.headerButton}>X</button>
                    </div>

                    {/* Geração dos dias do mês */}
                    <div style={styles.calendarGrid}>
                        {generateMonthDays().map((day, index) => {
                            const isOutsideMonth = format(day, 'MM') !== format(currentDate, 'MM');
                            const isSelected = selectedDate === format(day, 'yyyy-MM-dd');

                            return (
                                <div
                                    key={index}
                                    style={{
                                        ...styles.calendarCell,
                                        ...(isOutsideMonth ? styles.outsideMonth : {}),
                                        ...(isSelected ? styles.selectedCell : {}),
                                    }}
                                    onClick={() => handleDateClick(day)}
                                >
                                    {format(day, 'd')}
                                </div>
                            );
                        })}
                    </div>

                    {/* Modal com as tarefas e metas */}
                    {showModal && (
                        <div style={styles.modalOverlay}>
                            <div style={styles.modalContent}>
                                <div style={styles.modalTitle}>
                                    Tarefas e Metas para {format(new Date(selectedDate + "T00:00:00"), 'dd MMMM yyyy')}
                                </div>
                                {loading ? (
                                    <div>Carregando...</div> // Indicador de carregamento
                                ) : error ? (
                                    <div style={styles.noTasksMessage}>{error}</div> // Mensagem de erro
                                ) : (
                                    <>
                                        {tasks.length > 0 && (
                                            <ul style={styles.taskList}>
                                                <Texto tamanho="24px" cor="#2D5186">Tarefas:</Texto>
                                                {tasks.map((task, index) => (
                                                    <li key={index} style={styles.taskItem}>{task.Nome}</li>
                                                ))}
                                            </ul>
                                        )}
                                        {filteredMetas.length > 0 ? (
                                            <ul style={styles.taskList}>
                                                <Texto tamanho="24px" cor="#2D5186">Metas:</Texto>
                                                {filteredMetas.map((meta, index) => (
                                                    <li key={index} style={styles.metaItem}>
                                                        <strong>{meta.Nome}</strong>
                                                        <div>{format(new Date(meta.Dia), 'dd MMMM yyyy')}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div style={styles.noTasksMessage}>Não há metas para esta data.</div>
                                        )}
                                    </>
                                )}
                                <button style={styles.closeButton} onClick={handleCloseModal}>Fechar</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    );
}
