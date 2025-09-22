import { View, Text, StyleSheet } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import { criarTabelaContatos } from './src/DB/CriaTabelaContatos';
import { getDataBase } from './src/DB/DbConnection';
import Contato from './src/contatos';

async function criaContatoInicial() {
  const contato = new Contato(null, null, null, null, null);
  return contato;
}

async function testarContato(db) {
  try {
    // Cria um novo contato
    const contato = new Contato('Teste', 'Unitário', 'teste@exemplo.com', '11999999999');
    const contato2= new Contato('Teste2','Unitário2', 'teste@exemplo.com2222', '1237821387126');

    await contato.salvarnoBanco(db);   
    console.log('Contato salvo:', contato);
    await contato2.salvarnoBanco(db);   
    console.log('Contato salvo:', contato2);


    // Atualiza o contato
    await contato.atualizar('NovoNome', 'NovoSobrenome', 'novo@email.com', '11888888888');
    console.log('Contato atualizado:', contato);

    // Carrega o contato do banco
    await contato.mudaContato(db, contato2.id);
    console.log('Contato carregado:', contato);

    // Deleta o contato
    await contato.delet(db);
    console.log('Contato deletado:', contato);

    return true;
  } catch (error) {
    console.error('Erro nos testes da classe Contato:', error);
    return false;
  }
}

async function testarConexao(db) {
  try {
    // Testa se o método execAsync existe
    if (db?.execAsync) {
      console.log('Conexão com o banco funcionando!');
      return true;
    } else {
      console.log('Método execAsync não disponível.');
      return false;
    }
  } catch (error) {
    console.error('Erro na conexão com o banco:', error);
    return false;
  }
}



function MainApp() {
  //parte inicial para criar o banco, tabela e contato inicial
  const db = getDataBase();
  criarTabelaContatos(db);
  const contato = criaContatoInicial();
  //parte inicial para criar o banco, tabela e contato inicial

  useEffect(() => {
    async function rodarTestes() {
      const conexaoOk = await testarConexao(db);
      if (conexaoOk) {
        await testarContato(db);
      }
    }
    if (db) rodarTestes();
  }, [db]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Testes executados! Veja o console.</Text>
    </View>
  );
}

export default function App() {
  return (
    <SQLiteProvider databaseName="agenda.db">
      <MainApp />
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
