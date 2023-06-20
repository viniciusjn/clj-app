import React from 'react';

import ListagemClientes from './views/listagem-clientes';
import ListagemCargos from './views/listagem-cargos';
import ListagemFuncionarios from './views/listagem-funcionarios';
import ListagemJogos from './views/listagem-jogos';
import ListagemPublishers from './views/listagem-publishers';
import ListagemVendas from './views/listagem-vendas';

import Login from './views/login';
import CadastroCliente from './views/cadastro-cliente';
import CadastroCargo from './views/cadastro-cargo';
import CadastroJogo from './views/cadastro-jogo';
import CadastroFuncionario from './views/cadastro-funcionario';
import CadastroPublisher from './views/cadastro-publishers';
import CadastroVenda from './views/cadastro-venda';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro-clientes/:idParam?' element={<CadastroCliente />}/>
        <Route path='/cadastro-cargos/:idParam?' element={<CadastroCargo />} />
        <Route path='/cadastro-jogos/:idParam?' element={<CadastroJogo />}/>
        <Route path='/cadastro-funcionarios/:idParam?' element={<CadastroFuncionario />} />
        <Route path='/cadastro-publishers/:idParam?' element={<CadastroPublisher />} />
        <Route path='/cadastro-vendas/:idParam?' element={<CadastroVenda />} />

        <Route path='/listagem-clientes' element={<ListagemClientes />} />
        <Route path='/listagem-cargos' element={<ListagemCargos />} />
        <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} />
        <Route path='/listagem-jogos' element={<ListagemJogos />} />
        <Route path='/listagem-publishers' element={<ListagemPublishers />} />
        <Route path='/listagem-vendas' element={<ListagemVendas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
