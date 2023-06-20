import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroVenda() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/vendas`;

  const [id, setId] = useState('');
  const [codVenda, setCodVenda] = useState('');
  const [valor, setValor] = useState('');
  const [idJogo, setIdJogo] = useState(0);
  const [idCliente, setIdCliente] = useState(0);

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setCodVenda('');
      setValor('');
      setIdJogo(0);
      setIdCliente(0);
    } else {
      setId(dados.id);
      setCodVenda(dados.codVenda);
      setValor(dados.valor);
      setIdJogo(dados.idJogo);
      setIdCliente(dados.setIdCliente);
    }
  }

  async function salvar() {
    let data = { id, codVenda, valor, idJogo, idCliente };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Venda ${codVenda} cadastrada com sucesso!`);
          navigate(`/listagem-vendas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Venda ${codVenda} alterada com sucesso!`);
          navigate(`/listagem-vendas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
      if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setCodVenda(dados.codVenda);
      setValor(dados.valor);
      setIdJogo(dados.idJogo);
      setIdCliente(dados.idCliente)
    }
  }

  const [dadosJogos, setDadosJogos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/jogos`).then((response) => {
      setDadosJogos(response.data);
    });
  }, []);

  const [dadosClientes, setDadosClientes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosJogos) return null;
  if (!dadosClientes) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Venda'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
            <FormGroup label='Código: *' htmlFor='inputCodVenda'>
                <input
                  type='text'
                  id='inputCodVenda'
                  value={codVenda}
                  className='form-control'
                  name='codVenda'
                  onChange={(e) => setCodVenda(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Valor: *' htmlFor='inputValor'>
                <input
                  type='text'
                  id='inputValor'
                  value={valor}
                  className='form-control'
                  name='valor'
                  onChange={(e) => setValor(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Jogo: *' htmlFor='selectJogo'>
                <select
                  className='form-select'
                  id='selectJogo'
                  name='idJogo'
                  value={idJogo}
                  onChange={(e) => setIdJogo(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosJogos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nomeJogo}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Cliente: *' htmlFor='selectCliente'>
                <select
                  className='form-select'
                  id='selectCliente'
                  name='idCliente'
                  value={idCliente}
                  onChange={(e) => setIdCliente(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosClientes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroVenda;
