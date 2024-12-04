import React from "react";
import logoPlanixAzul from "../../imgs/logoPlanixAzul.png";
import fotoPerfil from "../../imgs/gaxinimEmoji.png";
import Texto from "../Texto";
import DivCircular from "../DivCircular";
import PerfilModal from "../Modals/PerfilModal";
import { useState } from "react";
import './Header.css';

export default function Header({ onScrollToPlanner, onScrollToEconomico }) {
    const [openModal, setOpenModal] = useState(false);

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
            </div>

            <div id="perfilEInicio">
                <button onClick={() => setOpenModal(!openModal)} id="divPerfil">
                    <DivCircular>
                        <img src={fotoPerfil} height="40px" width="40px" alt="Perfil" />
                    </DivCircular>
                </button>
                <PerfilModal isOpen={openModal} />
            </div>
        </div>
    );
}
