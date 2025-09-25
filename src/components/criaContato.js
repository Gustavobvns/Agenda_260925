import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { getDataBase } from "../DB/DbConnection";
import Contato from "../contatos";
import { useNavigation } from '@react-navigation/native';


export default function CriarContato() {
  const db = getDataBase();
  const navigation = useNavigation();


  // Inicializa os estados com os dados do contatoAtual
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSalvar = async () => {
    if (db) {
      const novoContato = new Contato(nome, sobrenome, email, telefone);
      await novoContato.atualizar(db, nome, sobrenome, email, telefone);
      console.log("Novo Contato: ", novoContato );
      navigation.popToTop(); // Volta para a tela anterior
    } else {
      console.log("não foi");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar Contato</Text>
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
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />
        <Button title="Salvar" onPress={handleSalvar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});