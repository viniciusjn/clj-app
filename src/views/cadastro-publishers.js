import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';

import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroPublisher() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/publishers`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [estudio, setEstudio] = useState('');
  const [cnpj, setCnpj] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setEstudio('');
      setCnpj('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setEstudio(dados.estudio);
      setCnpj(dados.cnpj);
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      estudio,
      cnpj
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Publisher ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-publishers`);
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
          mensagemSucesso(`Publisher ${nome} alterado com sucesso!`);
          navigate(`/listagem-publishers`);
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
      setNome(dados.nome);
      setEstudio(dados.estudio);
      setCnpj(dados.cnpj);
    }
  }

  //const [dadosProfessores, setDadosProfessores] = React.useState(null);

  //useEffect(() => {
    //axios.get(`${BASE_URL}/professores`).then((response) => {
      //setDadosProfessores(response.data);
    //});
  //}, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Publisher'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Estúdio: *' htmlFor='inputEstudio'>
                <input
                  type='text'
                  id='inputEstudio'
                  value={estudio}
                  className='form-control'
                  name='estudio'
                  onChange={(e) => setEstudio(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CNPJ: *' htmlFor='inputCnpj'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputCnpj'
                  value={cnpj}
                  className='form-control'
                  name='cnpj'
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </FormGroup>

              <br></br>
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

export default CadastroPublisher;
