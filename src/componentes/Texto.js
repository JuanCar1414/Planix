import styled from "styled-components";


const Texto = styled.p`
    font-family: "Poppins", sans-serif;
    font-weight: ${props => props.peso || 'normal'};
    font-style: normal;
    font-size: ${props => props.tamanho || '12px'};
    color: ${props => props.cor || 'black'};
    margin-left: ${props => props.margemLeft || '0px'}

`
export default Texto;