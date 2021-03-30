import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import imagen from './cryptomonedas.png';

//Styled Components
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  //useState
  const [ moneda, guardarMoneda ] = useState('');
  const [ cripto, guardarCriptomoneda ] = useState('');
  const [ resultado, guardarResultado ] = useState({});
  const [ cargando, guardarCargando ] = useState(false);
  //useEffect
  useEffect(() => {

    //evita la carga al iniciar
    const cotizarCriptomoneda = async () => {
      if(moneda === '') return;

      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const resultado = await axios.get(URL);
      guardarCargando(true);
      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[cripto][moneda]);
      }, 2500);
    }

    cotizarCriptomoneda();

  }, [moneda, cripto]);

  //carga condicional de los componentes
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} /> 
  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt='Crypto Image'
        />
      </div>
      <div>
        <Heading>Instant Cryptocurrency Value</Heading>
        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}

      </div>
    </Contenedor>
  );
}

export default App;
