import styled from "styled-components";

const InputsEBotao = styled.input`
    width:   ${props => props.largura || '310px'};
    height:  ${props => props.altura || '30px'};

    border-radius: 20px;
    background-color: #F8F8F8;

    border: 1px solid #ccc;

    font-family: "Poppins", sans-serif;
    font-weight: lighter;
    font-style: normal;
    font-size: 16px;
    padding: 8px;
    
    

    &::placeholder {
        font-family: "Poppins", sans-serif;
        font-weight: normal;
        font-style: normal;
        font-size: 12px;
        color: #ccc; 
        padding: 4px;

    }

    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);


`

export default InputsEBotao;