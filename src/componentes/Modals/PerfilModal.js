import React from 'react';
import fotoPerfil from '../../imgs/gaxinimEmoji.png';
import logoPerfil from '../../imgs/logoPerfil.png';
import logoConfig from '../../imgs/configPerfilModal.png';
import logoSair from '../../imgs/logoSairModal.png';
import logoTarefa from '../../imgs/tarefaLogo.png';
import Texto from '../Texto';
import { Link } from 'react-router-dom';

const styles = {
    perfilModal: {
        position: 'absolute',
        top: '73px',
        right: '15px',
        width: '290px',
        height: '330px',
        backgroundColor: '#F8F8F8',
        borderRadius: '10%',
        padding: '8px',
        border: '1.5px solid #d1d1d1'
    },
    fotoModalPerfil: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
        backgroundColor: '#FCF8F8',
        height: '80px',
        width: '80px',
        boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.2)',
    },
    infosPerfil: {
        height: '136px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #d1d1d1',
    },
    txtConfigPerfil: {
        height: '40px',
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3.2px',
    },
    txtSair: {
        width: '100%',
        borderBottom: '2px solid #d1d1d1',
    },

    linksPerfil: {
        textDecoration: 'none',
    },
};

export default function PerfilModal({ isOpen }) {
    if (isOpen) {
        return (
            <div style={styles.perfilModal}>
                <div style={styles.infosPerfil}>
                    <div style={styles.fotoModalPerfil}>
                        <img src={fotoPerfil} height="70px" width="70px" alt="" />
                    </div>
                    <Texto peso="normal" tamanho="18px" cor="#555">Guanixim</Texto>
                    <Texto peso="600" tamanho="15px" cor="#555">exampleEmail@lorinIpsum.com</Texto>
                </div>
                <div id="configPerfi">

                    <div style={styles.txtConfigPerfil}>
                        <img src={logoPerfil} height="20px" width="20px" alt="" />
                        <Link to={null} style={styles.linksPerfil}>
                            <Texto peso="normal" tamanho="16px" cor="#000" margemLeft="8px">Perfil</Texto>
                        </Link>
                    </div>

                    <div style={styles.txtConfigPerfil}>
                        <img src={logoConfig} height="20px" width="20px" alt="" />
                        <Link to={null} style={styles.linksPerfil}>
                            <Texto peso="normal" tamanho="16px" cor="#000" margemLeft="8px">Configuração</Texto>
                        </Link>
                    </div>
                    <div style={{ ...styles.txtConfigPerfil, ...styles.txtSair }}>
                        <img src={logoSair} height="20px" width="20px" alt="" />
                        <Link to={null} style={styles.linksPerfil}>
                            <Texto peso="normal" tamanho="16px" cor="#000" margemLeft="8px">Sair</Texto>
                        </Link>
                    </div>
                    <div style={styles.txtConfigPerfil}>
                        <img src={logoTarefa} height="20px" width="20px" alt="" />
                        <Link to={null} style={styles.linksPerfil}>
                            <Texto peso="normal" tamanho="16px" cor="#000" margemLeft="8px">Minhas Tarefas</Texto>
                        </Link>
                    </div>
                </div>
            </div >
        );
    }

    return null;
}
