import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getDataBase } from "../DB/DbConnection";
import Contato from "../contatos";
import { useNavigation } from '@react-navigation/native';
import { ContatoContext } from "../ContatoContext";
import { useContext } from "react";
export default function VisualizaContatos() {
  const db = getDataBase();
  const navigation = useNavigation();
  const { contatoAtual } = useContext(ContatoContext);

  const [contatos, setContatos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const carregarContatos = async () => {
        try {
          const contatos = await Contato.consultaContatos(db);

          if (isActive) {
            setContatos(contatos);
          }
        } catch (error) {
          console.error("Erro ao carregar contatos:", error);
        }
      };

      carregarContatos();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const renderizaContato = ({ item: contato }) => {
    const handleEditarContato = async () => {
    console.log(contato.id);
    await contatoAtual.mudaContato(db, contato?.id);
    navigation.navigate('EditaContatos');
  };

    return (
  <TouchableOpacity onPress={handleEditarContato} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', width: '95%', alignSelf: 'center' }}>
    <Text>{contato.nome} {contato.sobrenome}</Text>
    <Text>{contato.telefone}</Text>
    <Text>{contato.email}</Text>
  </TouchableOpacity>
);
  };

  return (
    <View style={{ flex: 1, width: "96%", borderTopWidth: 1, borderTopColor: '#ccc', alignSelf: 'center'}}>
      <FlatList
        keyExtractor={(contato) => contato.id.toString()}
        data={contatos}
        renderItem={renderizaContato}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

