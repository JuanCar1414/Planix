import React, { useState } from "react";
import { useParams } from "react-router-dom";
import logoPlanixAzul from "../../imgs/logoPlanixAzul.png";
import fotoPerfil from "../../imgs/gaxinimEmoji.png";
import Texto from "../Texto";
import DivCircular from "../DivCircular";
import PerfilModal from "../Modals/PerfilModal";
import AddGanhoGastoModal from "../../componentes/Modals/AddGanhoGastoModal.js";
import "./Header.css";

export default function Header({ onScrollToPlanner, onScrollToEconomico }) {
    const { NomeUsuario } = useParams(); // Mova o useParams para dentro da função componente
    const [openModal, setOpenModal] = useState(false);
    const [openModalAddGan, setOpenModalAddGan] = useState(false);

    // Função para fechar o modal de "Adicionar Gasto/Ganho"
    const handleCloseModalAddGan = () => {
        setOpenModalAddGan(false);
    };

    return (
        <div id="header">
            <div id="logo">
                <img src={logoPlanixAzul} height="80px" width="300px" alt="Logo" />
            </div>

            <div id="txtModos">
                <Texto
                    peso="600"
                    tamanho="15px"
                    cor="#555"
                    className="textoHeader"
                    onClick={onScrollToPlanner}
                    style={{ cursor: "pointer" }}
                >
                    Modo Planner
                </Texto>

                <Texto
                    peso="600"
                    tamanho="15px"
                    cor="#555"
                    className="textoHeader"
                    onClick={onScrollToEconomico}
                    style={{ cursor: "pointer" }}
                >
                    Modo Econômico
                </Texto>

                <button onClick={() => setOpenModalAddGan(true)} className="txtCentro" id="btnAddGanhoGastoEcon">
                    <Texto tamanho="16px" cor="#fff">Adicionar Gasto/Ganho</Texto>
                </button>
            </div>

            <div id="perfilEInicio">
                <button onClick={() => setOpenModal(!openModal)} id="divPerfil">
                    <DivCircular>
                        <img src={fotoPerfil} height="40px" width="40px" alt="Perfil" />
                    </DivCircular>
                </button>
                <PerfilModal isOpen={openModal} />
            </div>

            {openModalAddGan && (
                <AddGanhoGastoModal
                    isOpen={openModalAddGan}
                    onClose={handleCloseModalAddGan}
                    nomeUsuario={NomeUsuario}
                />
            )}
        </div>
    );
}
