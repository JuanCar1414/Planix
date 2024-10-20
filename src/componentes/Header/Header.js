import logoPlanixAzul from '../../imgs/logoPlanixAzul.png';
import fotoPerfil from '../../imgs/gaxinimEmoji.png';
// import InputsEBotao from '../InputsEBotao';
import Texto from '../Texto';
import './Header.css';
import DivCircular from '../DivCircular';
import PerfilModal from '../Modals/PerfilModal/PerfilModal';
import { useState } from 'react';



export default function Header() {

    const [openModal , setOpenModal] = useState(false)

    return (
        <div id='header'>
            <div id="logo">
                <img src={logoPlanixAzul} height='80px' width='300px' />
            </div>

            <div id="txtModos">
                <Texto peso='600' tamanho='15px' cor='#555' className='textoHeader'>Modo Planner</Texto>

                <Texto peso='600' tamanho='15px' cor='#555' className='textoHeader'>Modo Economico</Texto>
            </div>

            <div id="perfilEInicio">
                {/* <InputsEBotao
                    id='btnDeVoltarHeader'
                    largura='40px'
                    altura='40px'
                    type='button'
                /> esse e o btn de voltar, nao vejo necessidade dessa merda feia q nao sei configurar, mas caso falem pra voltar ta aqui*/}
                <button onClick={() => {setOpenModal(!openModal)}} id='divPerfil'>
                    <DivCircular>
                        <img src={fotoPerfil} height='40px' width='40px' alt='' />
                    </DivCircular>
                </button>
                <PerfilModal isOpen={openModal}/>

            </div>

        </div>
    )
}