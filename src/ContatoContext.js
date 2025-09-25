import React from 'react';
import Contato from './contatos';

export const ContatoContext = React.createContext({
  contatoAtual: new Contato(null,null, null, null),
});
