import { useState } from "react";
import Card from "../Card";
import Texto from "../Texto";
import InputsEBotao from "../InputsEBotao";

export default function AddMetaModal({ isOpen, onClose }) {
    const [descricao, setDescricao] = useState('');

    const handleDescricaoChange = (e) => {
        setDescricao(e.target.value);
        adjustHeight(e.target);
    };

    const adjustHeight = (element) => {
        element.style.height = 'auto'; // Reseta a altura
        element.style.height = `${element.scrollHeight}px`; // Ajusta a altura com base no conteúdo
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
        campoDeValorDescricao: {
            width: '100%',
            height: '45%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '8px',
        },
        corpoAddTarefa: {
            height: '85%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '8px',
        },
        parteSuperior: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '50%',
            alignItems: 'center',
            padding: '0 16px',
            gap: '16px', // Maior espaçamento entre elementos
        },
        linhaDataHora: {
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '16px', // Maior espaçamento entre os campos
        },
        campoNome: {
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
        },
        campoIndividual: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '48%', // Ajuste para garantir espaçamento uniforme
        },
        parteInferior: {
            width: '100%',
            height: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: '16px', // Espaçamento entre os elementos internos
        },
        inputsModalAddValoresDescricao: {
            width: '90%',
            padding: '8px',
            fontSize: '16px',
            borderRadius: '20px',
            backgroundColor: '#F8F8F8',
            border: '1px solid #ccc',
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 'lighter',
            fontStyle: 'normal',
            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.2)',
            resize: 'none',
            minHeight: '100%',
            height: '100%',
        },
        submitModal: {
            width: '110px',
            height: '50px',
            borderRadius: '20px',
            backgroundColor: '#2D5287',
            color: '#fff',
            border: '1px solid #ccc',
            fontFamily: '"Poppins", sans-serif',
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
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
            }}>
                <Card altura="470px" largura="754px" cor="#fefefe" borda="solid #d1d1d1 2px;" radius="50px" id="cardTarefaAddModal"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1001,
                    }}>
                    <div style={styles.txtAddTarefa}>
                        <Texto tamanho="21px" cor="#2D5186">Adicionar Metas</Texto>
                        <button onClick={onClose} style={styles.closeButton}>
                            <Texto tamanho="20px" peso="light">X</Texto>
                        </button>
                    </div>
                    <div style={styles.corpoAddTarefa}>
                        {/* Parte superior */}
                        <div style={styles.parteSuperior}>
                            <div style={styles.campoNome}>
                                <Texto tamanho="18px" cor="#2D5186">Nome da Meta:</Texto>
                                <InputsEBotao
                                    placeholder="Digite o nome"
                                    id="inputsModalAddValores"
                                    style={{ width: '100%', height: '40px', borderRadius: '8px', padding: '4px' }}
                                />
                            </div>
                            <div style={styles.linhaDataHora}>
                                <div style={styles.campoIndividual}>
                                    <Texto tamanho="18px" cor="#2D5186">Dia:</Texto>
                                    <InputsEBotao
                                        placeholder="Selecione o dia"
                                        id="inputsModalAddValores"
                                        style={{ width: '100%', height: '40px', borderRadius: '8px', padding: '4px' }}
                                        type="date"
                                    />
                                </div>
                                <div style={styles.campoIndividual}>
                                    <Texto tamanho="18px" cor="#2D5186">Horário:</Texto>
                                    <InputsEBotao
                                        placeholder="Selecione o horário"
                                        id="inputsModalAddValores"
                                        style={{ width: '100%', height: '40px', borderRadius: '8px', padding: '4px' }}
                                        type="time"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Parte inferior */}
                        <div style={styles.parteInferior}>
                            <div style={styles.campoDeValorDescricao}>
                                <Texto tamanho="18px" cor="#2D5186">Descrição:</Texto>
                                <textarea
                                    placeholder="Descrição"
                                    id="inputsModalAddValores"
                                    value={descricao}
                                    onChange={handleDescricaoChange}
                                    style={styles.inputsModalAddValoresDescricao}
                                    rows={1}
                                />
                            </div>
                            <input type="submit" id="SubmitModal" value="Salvar" style={styles.submitModal}></input>
                        </div>
                    </div>
                </Card>
            </div>
        )
        );
}