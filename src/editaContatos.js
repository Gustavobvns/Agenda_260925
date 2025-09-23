import React, {useContext} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import { ContatoContext } from './ContatoContext';
import { getDataBase } from './DB/DbConnection';



export default function EditaContatos() {
  const { contatoAtual } = useContext(ContatoContext);
  console.log('CONTATO ATUAL NO EDITA:', contatoAtual);
  const db = getDataBase();

  const handleChange = (field, value) => {
  };

  const handleSalvar = async () => {
    if (contatoAtual && db) {
      await contatoAtual.salvarnoBanco(db);
      // Você pode exibir um alerta ou navegar de volta após salvar
      console.log('Contato salvo no banco:', contatoAtual);
    }
  };

  return (
    <View>
      <Text>Editar Contato</Text>
      <TextInput
        placeholder="Nome"
        value={contatoAtual?.nome || ''}
        onChangeText={text => handleChange('nome', text)}
      />
      <TextInput
        placeholder="Sobrenome"
        value={contatoAtual?.sobrenome || ''}
        onChangeText={text => handleChange('sobrenome', text)}
      />
      <TextInput
        placeholder="Email"
        value={contatoAtual?.email || ''}
        onChangeText={text => handleChange('email', text)}
      />
      <TextInput
        placeholder="Telefone"
        value={contatoAtual?.telefone || ''}
        onChangeText={text => handleChange('telefone', text)}
      />
      <Button title="Salvar" onPress={handleSalvar} />
    </View>
  );
}
