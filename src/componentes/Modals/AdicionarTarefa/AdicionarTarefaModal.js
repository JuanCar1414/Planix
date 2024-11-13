import { useState } from "react";
import Card from "../../Card";
import Texto from "../../Texto";
import './AdicionarTarefaModal.css'


export default function AddTarefaModal({ }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <Card altura='485px' largura='754px' cor='#fefefe' borda='solid #d1d1d1 2px;' radius='50px' id='cardTarefa'>
            <div id="txtAddTarefa">
                <Texto tamanho='21px' cor='#2D5186'>Adicinar Dado</Texto>
                <div>
                    <button onClick={toggleDropdown}>
                        {isOpen ? 'Fechar Opções' : 'Mostrar Opções'}
                    </button>
                    {isOpen && (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li><button>Opção 1</button></li>
                            <li><button>Opção 2</button></li>
                            <li><button>Opção 3</button></li>
                        </ul>
                    )}
                </div>
            </div>
            <div id="corpoAddTarefa">

            </div>

        </Card >
    )
}
