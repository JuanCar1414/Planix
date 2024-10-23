import React from 'react'
import './PerfilModal.css'
import fotoPerfil from '../../../imgs/gaxinimEmoji.png';
import logoPerfil from '../../../imgs/logoPerfil.png';
import logoConfig from '../../../imgs/configPerfilModal.png';
import logoSair from '../../../imgs/logoSairModal.png';
import Texto from '../../Texto';

export default function PerfilModal({ isOpen }) {
    if (isOpen) {
        return (
            <div id='PerfilModal'>
                <div id='infosPerfi'>
                    <div id='fotoModalPerfil'>
                        <img src={fotoPerfil} height='70px' width='70px' alt='' />
                    </div>
                    <Texto peso='normal' tamanho='18px' cor='#555'>Guanixim</Texto>
                    <Texto peso='600' tamanho='15px' cor='#555'>exampleEmail@lorinIpsum.com</Texto>
                </div>
                <div id='configPerfi'>
                    <div className='txtConfigPerfil'>
                        <img src={logoPerfil} height='20px' width='20px' alt='' />
                        <Texto peso='normal' tamanho='16px' cor='#555'>Perfil</Texto>
                    </div>
                    <div className='txtConfigPerfil'>
                        <img src={logoConfig} height='20px' width='20px' alt='' />
                        <Texto peso='normal' tamanho='16px' cor='#555'>Configuracao</Texto>
                    </div>
                    <div className='txtConfigPerfil'>
                        <img src={logoSair} height='20px' width='20px' alt='' />
                        <Texto peso='normal' tamanho='16px' cor='#555'>Sair</Texto>
                    </div>
                </div>


            </div>
        )
    }

    return null;


}
