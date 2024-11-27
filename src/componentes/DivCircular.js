import styled from "styled-components";

const DivCircular = styled.div`
    display: flex;
   justify-content: center;
   align-items: center;

   border-radius: 100%;
   background-color: #FCF8F8;

   height: ${props => props.altura || '50px'};
    width: ${props => props.largura || '50px'};

   box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2); 
`

export default DivCircular