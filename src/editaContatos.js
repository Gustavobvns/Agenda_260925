import React,  { useContext, useState }from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import { ContatoContext } from './ContatoContext';
import { getDataBase } from './DB/DbConnection';
import { useNavigation } from '@react-navigation/native';



export default function EditaContatos() {
  const { contatoAtual } = useContext(ContatoContext);
  const db = getDataBase();
  const navigation = useNavigation();

   // Inicializa os estados com os dados do contatoAtual
  const [nome, setNome] = useState(contatoAtual?.nome || '');
  const [sobrenome, setSobrenome] = useState(contatoAtual?.sobrenome || '');
  const [email, setEmail] = useState(contatoAtual?.email || '');
  const [telefone, setTelefone] = useState(contatoAtual?.telefone || '');

  const handleSalvar = async () => {
    if (contatoAtual && db) {
      await contatoAtual.atualizar(db, nome, sobrenome, email, telefone);
      console.log('Contato atualizado e salvo:', contatoAtual);
    } else {
        console.log('não foi')
    }
  };

  const handleExcluir = async () => {
    if (contatoAtual && db) {
      await contatoAtual.excluir(db);
      console.log('Contato excluído');
      navigation.popToTop(); // Volta para a tela anterior
    } else {
        console.log('não foi excluido');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
    <View style={styles.container}>
      <Text style={styles.title}>Editar Contato</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={setSobrenome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType = "phone-pad"
        value={telefone}
        onChangeText={setTelefone}
      />
      <Button title="Salvar" onPress={handleSalvar} />
    </View>
    <View style={styles.container}>
        <Button style={styles.excluirButton} title="Excluir" onPress={handleExcluir} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
  },
  excluirButton: {
    marginTop: 10,
    Color: '#FF3B30',
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
