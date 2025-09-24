import { View, Text, StyleSheet, Button } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { ContatoContext } from './src/ContatoContext';
import { criarTabelaContatos } from './src/DB/CriaTabelaContatos';
import { getDataBase } from './src/DB/DbConnection';
import React, { useContext } from 'react';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditaContatos from './src/editaContatos';



function HomeScreen() {
  const navigation = useNavigation();
  const { contatoAtual } = useContext(ContatoContext);
  const id = 4; // Exemplo de ID para carregar o contato
  const db = getDataBase();

  const handleEditarContato = async () => {
    await contatoAtual.mudaContato(db, id);
    navigation.navigate('EditaContatos');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={handleEditarContato} title="Editar Contato" />
    </View>
  );
}

function EditaContatosScreen() {
  return <EditaContatos />;
  }

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomeScreen,
    EditaContatos: EditaContatosScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

function MainApp() {
  //parte inicial para criar o banco, tabela e contato inicial
  const db = getDataBase();
  criarTabelaContatos(db);
  //parte inicial para criar o banco, tabela e contato inicial


  
  return <Navigation />;

}
export default function App() {
  const { contatoAtual } = useContext(ContatoContext);
  return (
    <SQLiteProvider databaseName="agenda.db">
      <ContatoContext.Provider value={{ contatoAtual }}>
        <MainApp />
      </ContatoContext.Provider>
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
