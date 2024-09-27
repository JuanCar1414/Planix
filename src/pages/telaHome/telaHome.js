import InputsEBotao from "../../componentes/InputsEBotao"
import Texto from "../../componentes/Texto"
import "./telaHome.css"

export default function Home() {
    return (
        <div className="App">
            <div class='pesquisaETal'>
                <InputsEBotao largura='300px' altura='20px' placeholder="Pesquisar"></InputsEBotao>
                <div class='saldo'>
                    <div class='nomeSaldo'>
                        <Texto peso='10' tamanho='26px'>Saldo:</Texto>
                    </div>
                    <div class='valor'>
                        <Texto peso='10' tamanho='26px'>R$7310,97</Texto>
                    </div>
                </div>
            </div>
        </div>
    )
}