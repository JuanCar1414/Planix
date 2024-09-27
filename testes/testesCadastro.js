import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Cadastro = ({ setIsLogado }) => {

    //controle de estado
    const [nome, setnome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setsenha] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    //Função para cadastro
    const handleSubmit = async (e) => {
        //prever os eventos padrões do form
        e.preventDefault();
        //criar o objeto que enviaremos para a api
        const user = { nome, email, senha }

        try {
            const response = await fetch('https://aba5bf0f-e78d-41c6-b54b-040ba6f59a12-00-2l8p7mnv5ftom.picard.replit.dev/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                setIsLogado(true);
                navigate('/');
                setMsg('Cadastro feito com sucesso')
            } else {
                setMsg('Erro ao cadastrar')
            }

        } catch (error) {
            setMsg(error);
        }


    }

    return (
        <>
            <p>Cadastro</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setnome(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setsenha(e.target.value)}
                    />
                </div>
                <p>{msg}</p>
                <button type="submit">Cadastrar</button>
            </form>
        </>
    )
}

export default Cadastro;