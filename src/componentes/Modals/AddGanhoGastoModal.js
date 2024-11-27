import { useState } from "react";
import Card from "../Card";
import Texto from "../Texto";
import InputsEBotao from "../InputsEBotao";

export default function AddGanhoGastoModal({ isOpen, onClose }) {
    const [openModalAddGan, setOpenModalAddGan] = useState(false);
    const [isOpenBtn, setIsOpenBtn] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Mostrar Opções');

    const toggleDropdownbtn = () => setIsOpenBtn(!isOpenBtn);
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpenBtn(false);  // Fecha o menu quando uma opção for selecionada
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
            top: '12%',
            right: '14.2%',
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

    // Aqui garantimos que o modal seja exibido quando isOpen for true
    return (
        isOpen && (
            <div style={{
                position: 'fixed',  // Usa "fixed" para fixar o fundo na tela
                top: 0,
                left: 0,
                width: '100%',  // A largura ocupa toda a tela
                height: '100%',  // A altura ocupa toda a tela
                backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fundo semi-transparente
                zIndex: 1000,  // Garante que o fundo fique atrás do modal
            }}>
                <Card altura="550px" largura="550px" cor="#F8F8F8" borda="solid #d1d1d1 2px;" radius="50px" id="cardTarefaAddModal"
                    style={{
                        position: 'absolute',  // Posiciona o modal no centro da tela
                        top: '50%',  // Posição vertical centrada
                        left: '50%',  // Posição horizontal centrada
                        transform: 'translate(-50%, -50%)',  // Para ajustar ao centro exato
                        zIndex: 1001  // Garante que o modal fique acima do fundo
                    }}>
                    <div style={styles.txtAddTarefa}>
                        <Texto tamanho="21px" cor="#2D5186">Adicionar Dado</Texto>
                        <div>
                            <button onClick={toggleDropdownbtn} style={styles.toggleBtn}>
                                {selectedOption} {/* Exibe o texto da opção selecionada */}
                            </button>
                            {isOpenBtn && (
                                <ul style={styles.dropdownMenu}>
                                    <li>
                                        <button
                                            style={styles.opnToggleBtn}
                                            onClick={() => handleOptionClick('Ganhos')}
                                        >
                                            Ganhos
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            style={styles.opnToggleBtn}
                                            onClick={() => handleOptionClick('Gastos')}
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
                        <div style={styles.campoDeValor}>
                            <Texto tamanho="16px" cor="#2D5186">Valor:</Texto>
                            <InputsEBotao
                                placeholder="Valor"
                                id="inputsModalAddValores"
                                style={styles.inputsModalAddValores}
                            />
                        </div>
                        <div style={styles.campoDeValor}>
                            <Texto tamanho="16px" cor="#2D5186">Nome:</Texto>
                            <InputsEBotao
                                placeholder="Nome"
                                id="inputsModalAddValores"
                                style={styles.inputsModalAddValores}
                            />
                        </div>
                        <div style={styles.campoDeValor}>
                            <Texto tamanho="16px" cor="#2D5186">Descrição:</Texto>
                            <InputsEBotao
                                placeholder="Descrição"
                                id="inputsModalAddValores"
                                style={styles.inputsModalAddValores}
                            />
                        </div>
                        <div style={styles.campoDeValor}>
                            <Texto tamanho="16px" cor="#2D5186">Tipo:</Texto>
                            <InputsEBotao
                                placeholder="Tipo"
                                id="inputsModalAddValores"
                                style={styles.inputsModalAddValores}
                            />
                        </div>
                        <div style={styles.campoDeValor}>
                            <Texto tamanho="16px" cor="#2D5186">Mês:</Texto>
                            <InputsEBotao
                                placeholder="Mês"
                                id="inputsModalAddValores"
                                style={styles.inputsModalAddValores}
                            />
                        </div>
                        <input type="submit" id="SubmitModal" value="Feito" style={styles.submitModal}></input>
                    </div>
                </Card>
            </div>
        )
    );
}
