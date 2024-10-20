import React from 'react'
import './PerfilModal.css'
import fotoPerfil from '../../../imgs/gaxinimEmoji.png';
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


            </div>
        )
    }

    return null;


}
