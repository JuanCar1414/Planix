import styled from "styled-components";


const Texto = styled.p`
    font-family: "Poppins", sans-serif;
    font-weight: ${props => props.peso || 'normal'};
    font-style: normal;
    font-size: ${props => props.tamanho || '12px'};

`
export default Texto;