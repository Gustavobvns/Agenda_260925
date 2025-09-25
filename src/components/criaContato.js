import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getDataBase } from "../DB/DbConnection";
import Contato from "../contatos";
import { useNavigation } from "@react-navigation/native";

export default function CriarContato() {
  const db = getDataBase();
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSalvar = async () => {
    if (db) {
      const novoContato = new Contato(nome, sobrenome, email, telefone);
      await novoContato.atualizar(db, nome, sobrenome, email, telefone);
      console.log("Novo Contato: ", novoContato);
      navigation.popToTop();
    } else {
      console.log("não foi");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar Contato</Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Sobrenome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          value={sobrenome}
          onChangeText={setSobrenome}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#444",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
