import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroJogo() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/jogos`;

  const [id, setId] = useState('');
  const [nomeJogo, setNomeJogo] = useState('');
  const [generoJogo, setGeneroJogo] = useState('');
  const [classificacaoind, setClassificacaoind] = useState('');
  const [idPublisher, setIdPublisher] = useState(0);

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNomeJogo('');
      setGeneroJogo('');
      setClassificacaoind('');
      setIdPublisher(0);
    } else {
      setId(dados.id);
      setNomeJogo(dados.nomeJogo);
      setGeneroJogo(dados.generoJogo);
      setClassificacaoind(dados.classificacaoind);
      setIdPublisher(dados.idPublisher);
    }
  }

  async function salvar() {
    let data = { id, nomeJogo, generoJogo, classificacaoind, idPublisher };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Jogo ${nomeJogo} cadastrado com sucesso!`);
          navigate(`/listagem-jogos`);
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
          mensagemSucesso(`Jogo ${nomeJogo} alterado com sucesso!`);
          navigate(`/listagem-jogos`);
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
      setNomeJogo(dados.nomeJogo);
      setGeneroJogo(dados.generoJogo);
      setClassificacaoind(dados.classificacaoind);
      setIdPublisher(dados.idPublisher);
    }
  }

  const [dadosPublishers, setDadosPublishers] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/publishers`).then((response) => {
      setDadosPublishers(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosPublishers) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Jogo'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNomeJogo'>
                <input
                  type='text'
                  id='inputNomeJogo'
                  value={nomeJogo}
                  className='form-control'
                  name='nomeJogo'
                  onChange={(e) => setNomeJogo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Gênero: *' htmlFor='inputGeneroJogo'>
                <input
                  type='text'
                  id='inputGeneroJogo'
                  value={generoJogo}
                  className='form-control'
                  name='generoJogo'
                  onChange={(e) => setGeneroJogo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Classificação Indicativa: *' htmlFor='inputClassificacaoind'>
                <input
                  type='text'
                  maxLength='2'
                  id='inputClassificacaoind'
                  value={classificacaoind}
                  className='form-control'
                  name='classificacaoind'
                  onChange={(e) => setClassificacaoind(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Publisher: *' htmlFor='selectPublisher'>
                <select
                  className='form-select'
                  id='selectPublisher'
                  name='idPublisher'
                  value={idPublisher}
                  onChange={(e) => setIdPublisher(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosPublishers.map((dado) => (
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

export default CadastroJogo;
