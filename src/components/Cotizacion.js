import React from 'react';
import styled from '@emotion/styled';

//styled components
const ResultadoDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;

  p {
    span {
      font-weight: bold;
    }
  }
`;
const Info = styled.p`
  font-size: 18px;
`;
const Precio = styled.p`
  font-size: 30px;
`;

const Cotizacion = ({resultado}) => {
  if(Object.keys(resultado).length === 0) return null;
  console.log(resultado)
  return (  
    <ResultadoDiv>
      <Precio>The price is:              <span>{resultado.PRICE}</span></Precio>
      <Info>Highest price of the day:  <span>{resultado.HIGHDAY}</span></Info>
      <Info>Lowest price of the day:   <span>{resultado.LOWDAY}</span></Info>
      <Info>Last 24 hours variation:   <span>{resultado.CHANGEPCT24HOUR}</span></Info>
      <Info>Last update:               <span>{resultado.LASTUPDATE}</span></Info>
    </ResultadoDiv>
  );
}
 
export default Cotizacion;