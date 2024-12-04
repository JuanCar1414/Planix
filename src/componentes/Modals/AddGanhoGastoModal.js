import { useState } from "react";
import Card from "../Card";
import Texto from "../Texto";
import InputsEBotao from "../InputsEBotao";

export default function AddGanhoGastoModal({ isOpen, onClose, nomeUsuario }) {
    const [IsOpenBtn, setIsOpenBtn] = useState(false);
    const [SelectedOption, setSelectedOption] = useState('Escolha uma opcao'); // Padrão para "Ganhos"
    const [Valor, setValor] = useState('');
    const [Nome, setNome] = useState('');
    const [Descricao, setDescricao] = useState('');
    const [Tipo, setTipo] = useState('');
    const [Mes, setMes] = useState('');

    // Alterna o menu do botão
    const toggleDropdownbtn = () => setIsOpenBtn(!IsOpenBtn);

    // Seleciona entre "Ganhos" ou "Gastos"
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpenBtn(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação básica
        if (!Valor || !Nome || !Descricao || !Tipo || !Mes) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        const Dados = {
            Valor,
            Nome,
            Descricao,
            Tipo,
            Mes
        };

        try {
            const url = `https://13359055-906e-4585-9ab1-eb88fc2281f3-00-fdifq982mbt.worf.replit.dev/${nomeUsuario}/${SelectedOption === 'Ganhos' ? 'add-ganhos' : 'add-gastos'}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Dados),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`${SelectedOption} adicionado com sucesso!`);
                onClose(); // Fecha o modal
            } else {
                console.error('Erro ao adicionar:', data.message);
                alert(`Erro: ${data.message || 'Não foi possível adicionar o dado.'}`);
            }
        } catch (error) {
            console.error('Erro ao conectar com a API:', error);
            alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        }
    };


    const styles = {
        txtAddTarefa: {
            height: '63px',
            width: '95%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderBottom: '2px solid #d1d1d1',
        },
        toggleBtn: {
            height: '30px',
            width: '147px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            listStyle: 'none',
            border: '1px solid #d1d1d1',
            borderRadius: '40px',
            padding: '8px',
            marginBottom: '10px',
            cursor: 'pointer',
            backgroundColor: '#2D5287',
            color: "white",
        },
        dropdownMenu: {
            listStyle: 'none',
            padding: '0',
            margin: '0',
            position: 'absolute',
            top: '13.4%',
            right: '32.911%',
            backgroundColor: '#F8F8F8',
            border: '1px solid #d1d1d1',
            borderRadius: '8px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
        opnToggleBtn: {
            height: '30px',
            width: '147px',
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #d1d1d1',
            backgroundColor: '#2D5287',
            color: "white",
            borderRadius: '40px',
            padding: '8px',
            margin: '9px',
            cursor: 'pointer',
        },
        corpoAddTarefa: {
            height: '85%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
        },
        campoDeValor: {
            width: '85%',
            height: '70px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'space-between',
            margin: '8px',
        },
        inputsModalAddValores: {
            height: '40%',
            width: '100%',
            backgroundColor: '#fff',
        },
        submitModal: {
            width: '220px',
            height: '50px',
            borderRadius: '20px',
            backgroundColor: '#2D5287',
            color: '#fff',
            border: '1px solid #ccc',
            fontFamily: '"Poppins", sans-serif',
            marginTop: "20px",
            fontWeight: 'lighter',
            fontStyle: 'normal',
            fontSize: '14px',
            padding: '8px',
            cursor: 'pointer',
            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.2)',
        },
        closeButton: {
            position: 'absolute',
            top: '5%',
            right: '4%',
            backgroundColor: '#d1d1d1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            border: 'none',
            borderRadius: '100%',
            height: '40px',
            width: '40px',
            cursor: 'pointer',
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
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
            }}>
                <Card altura="550px" largura="550px" cor="#F8F8F8" borda="solid #d1d1d1 2px;" radius="50px">
                    <div style={styles.txtAddTarefa}>
                        <Texto tamanho="21px" cor="#2D5186">Adicionar Ganho/Gastos</Texto>
                        <div>
                            <button onClick={toggleDropdownbtn} style={styles.toggleBtn}>
                                {SelectedOption}  {/* Mostra "Ganhos" ou "Gastos" */}
                            </button>
                            {IsOpenBtn && (
                                <ul style={styles.dropdownMenu}>
                                    <li>
                                        <button
                                            style={styles.opnToggleBtn}
                                            onClick={() => handleOptionClick('Ganhos')}  // Seleciona Ganhos
                                        >
                                            Ganhos
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            style={styles.opnToggleBtn}
                                            onClick={() => handleOptionClick('Gastos')}  // Seleciona Gastos
                                        >
                                            Gastos
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <button onClick={onClose} style={styles.closeButton}>
                            <Texto tamanho="20px" peso="light">X</Texto>
                        </button>
                    </div>
                    <div style={styles.corpoAddTarefa}>
                        {/* Campos do Formulário */}
                        <div style={styles.campoDeValor}>
                            <Texto tamanho="16px" cor="#2D5186">Valor:</Texto>
                            <InputsEBotao
                                placeholder="Valor"
                                value={Valor}
                                onChange={(e) => setValor(e.target.value)}
                                style={styles.inputsModalAddValores}
                            />
                        </div>
                        <div style={styles.campoDeValor}>
                            <Texto tamanho="16px" cor="#2D5186">Nome:</Texto>
                            <InputsEBotao
                                placeholder="Nome"
                                value={Nome}
                                onChange={(e) => setNome(e.target.value)}
                                style={styles.inputsModalAddValores}
                            />
                        </div>
                        <div style={styles.campoDeValor}>
                            <Texto tamanho="16px" cor="#2D5186">Descrição:</Texto>
                            <InputsEBotao
                                placeholder="Descrição"
                                value={Descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                style={styles.inputsModalAddValores}
                            />
                        </div>
                        <div style={styles.campoDeValor}>
                            <Texto tamanho="16px" cor="#2D5186">Tipo:</Texto>
                            <InputsEBotao
                                placeholder="Tipo"
                                value={Tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                style={styles.inputsModalAddValores}
                            />
                        </div>
                        <div style={styles.campoDeValor}>
                            <Texto tamanho="16px" cor="#2D5186">Mês:</Texto>
                            <InputsEBotao
                                placeholder="Mês"
                                value={Mes}
                                onChange={(e) => setMes(e.target.value)}
                                style={styles.inputsModalAddValores}
                            />
                        </div>
                        <input
                            type="submit"
                            id="SubmitModal"
                            value="Feito"
                            style={styles.submitModal}
                            onClick={handleSubmit}
                        />
                    </div>
                </Card>
            </div>
        )
    );
}
