import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format } from 'date-fns';
import './Calendar.css'; // Arquivo CSS para estilos

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date()); // Data atual do calendário
    const [selectedDate, setSelectedDate] = useState(null); // Armazena a data selecionada
    const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
    const [tasks, setTasks] = useState({
        // Exemplo de tarefas associadas a datas específicas
        '2024-11-25': ['Reunião com a equipe', 'Enviar relatório'],
        '2024-11-27': ['Revisar código', 'Planejar próximos passos'],
    });

    // Obter início e fim do mês
    const startMonth = startOfMonth(currentDate);
    const endMonth = endOfMonth(currentDate);

    // Gerar a matriz de dias no mês
    const generateMonthDays = () => {
        const startDate = startOfWeek(startMonth); // Primeiro dia visível do calendário
        const endDate = endOfWeek(endMonth); // Último dia visível do calendário
        const days = [];
        let date = startDate;

        while (date <= endDate) {
            days.push(date);
            date = addDays(date, 1);
        }

        return days;
    };

    // Alterar o mês atual
    const handlePrevMonth = () => {
        setCurrentDate(addDays(startOfMonth(currentDate), -1)); // Vai para o último dia do mês anterior
    };

    const handleNextMonth = () => {
        setCurrentDate(addDays(endOfMonth(currentDate), 1)); // Vai para o primeiro dia do mês seguinte
    };

    // Lidar com o clique em uma data
    const handleDateClick = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setSelectedDate(formattedDate); // Armazena a data selecionada
        setShowModal(true); // Exibe o modal
    };

    // Fechar o modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDate(null);
    };

    return (
        <div className="calendar-container">
            {/* Header com controles */}
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>◀</button>
                <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                <button onClick={handleNextMonth}>▶</button>
            </div>

            {/* Dias da semana */}
            <div className="calendar-days">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                    <div key={day} className="calendar-day-header">
                        {day}
                    </div>
                ))}
            </div>

            {/* Corpo do calendário */}
            <div className="calendar-grid">
                {generateMonthDays().map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-cell ${format(day, 'MM') !== format(currentDate, 'MM') ? 'outside-month' : ''
                            } ${selectedDate === format(day, 'yyyy-MM-dd') ? 'selected' : ''}`}
                        onClick={() => handleDateClick(day)} // Chama a função ao clicar na data
                    >
                        {format(day, 'd')}
                    </div>
                ))}
            </div>

            {/* Modal de Tarefas */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Tarefas para {format(new Date(selectedDate), 'dd MMMM yyyy')}</h3>
                        <ul>
                            {tasks[selectedDate] ? (
                                tasks[selectedDate].map((task, index) => (
                                    <li key={index}>{task}</li>
                                ))
                            ) : (
                                <li>Não há tarefas para esta data.</li>
                            )}
                        </ul>
                        <button onClick={handleCloseModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
