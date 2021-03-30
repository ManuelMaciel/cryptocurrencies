import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCripto from '../hooks/useCripto';

//Styled Compontens
const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  width: 100%;
  color: #FFF;
  background-color: #66a2fe;
  transition: background-color .3s ease;

  &:hover{
    background-color: #326AC0;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

  //state del listado de criptomonedas
  const [ cripto, guardarCripto ] = useState([]);
  const [ error, guardarError ] = useState(false);

  const MONEDAS = [
    {codigo: 'USD', nombre: 'U.S. Dollar'},
    {codigo: 'PYG', nombre: 'Paraguayan Guarani'},
    {codigo: 'MXN', nombre: 'Mexican Peso'},
    {codigo: 'EUR', nombre: 'Euro'},
    {codigo: 'GBP', nombre: 'Pound Sterling'}
  ]
  //utilizar useMoneda
  const [ moneda, SelectMoneda, ] = useMoneda('Choose your currency ', '', MONEDAS);
  //utilizar useCriptomoneda
  const [ criptomoneda, SelectCripto ] = useCripto('Choose your cryptocurrency ', '', cripto);
  //useEffect
  useEffect( () => {
    const consultarAPI = async () => {
      const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(URL);
      guardarCripto(resultado.data.Data);
    }
    consultarAPI();
  }, []);

  const cotizarMoneda = e => {
    e.preventDefault();
    //valida si los states tienen datos
    if(moneda.stateInicial === '' || criptomoneda.stateInicial === '') {
      guardarError(true);
      return;
    }
    guardarError(false);
    guardarCriptomoneda(criptomoneda);
    guardarMoneda(moneda);
  }

  return (  
    <form
      onSubmit={cotizarMoneda}
    >
      {error ? <Error mensaje='Select all the fields' /> : null }
      <SelectMoneda />
      <SelectCripto />
      <Boton 
        type='submit'
        value='Calculate'
      />
    </form>
  );
}
 
export default Formulario;