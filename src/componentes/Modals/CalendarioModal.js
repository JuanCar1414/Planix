import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, startOfDay } from 'date-fns';
import Texto from '../Texto';

export default function Calendar({ isOpen, onClose }) {
    const [currentDate, setCurrentDate] = useState(startOfDay(new Date())); // Data atual normalizada
    const [selectedDate, setSelectedDate] = useState(null); // Data selecionada
    const [showModal, setShowModal] = useState(false); // Controla o modal
    const [tasks, setTasks] = useState({
        '2024-11-25': ['Reunião com a equipe', 'Enviar relatório', 'Enviar relatório'],
        '2024-11-27': ['Revisar código', 'Planejar próximos passos'],
    });

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
            color: '#2D5186', // Azul semelhante ao Google Calendar
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
            textDecoration: 'underline', // Sublinhado nos itens
            color: '#09101A',
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
            color: '#757575', // Cinza claro para mensagens informativas
            fontStyle: 'italic',
            textDecoration: 'underline',
        },
    };

    return (
        isOpen && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={styles.calendarContainer}>
                    <div style={styles.calendarHeader}>
                        <button style={styles.headerButton} onClick={handlePrevMonth}>◀</button>
                        <Texto tamanho="24px" className="dataHoraNomeHome" cor="#2D5186">{format(currentDate, 'MMMM yyyy')}</Texto>
                        <button style={styles.headerButton} onClick={handleNextMonth}>▶</button>
                        <button onClick={onClose} style={styles.headerButton}>X</button>
                    </div>
                    <div style={styles.daysGrid}>
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                            <div key={day} style={styles.dayHeader}>
                                {day}
                            </div>
                        ))}
                    </div>
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
                    {showModal && (
                        <div style={styles.modalOverlay}>
                            <div style={styles.modalContent}>
                                <div style={styles.modalTitle}>
                                    Tarefas para {format(new Date(selectedDate + "T00:00:00"), 'dd MMMM yyyy')}
                                </div>
                                {tasks[selectedDate] ? (
                                    <ul style={styles.taskList}>
                                        {tasks[selectedDate].map((task, index) => (
                                            <li key={index} style={styles.taskItem}>{task}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div style={styles.noTasksMessage}>Não há tarefas para esta data.</div>
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
