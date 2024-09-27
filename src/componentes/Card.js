import styled from "styled-components";

const Card = styled.div`
    height: ${props => props.altura || '120px'};
    width: ${props => props.largura || '120px'};
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    border-radius: 5%;
    padding: 24px;

`

export default Card;