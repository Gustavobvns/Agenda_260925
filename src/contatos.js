export default class Contato {
  constructor(nome, sobrenome, email, telefone){
    this.id = null;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.email = email;
    this.telefone = telefone;
  }

    async salvarnoBanco(db) {
        try {
            if(this.id === null){
                await db.runAsync(
                `INSERT INTO contatos (nome, sobrenome, email, telefone) VALUES (?, ?, ?, ?);`,
                [this.nome, this.sobrenome, this.email, this.telefone]
                );
                console.log("Contato salvo com sucesso.");

                // Captura o último ID gerado
                const resultado = await db.getFirstAsync(`SELECT last_insert_rowid() AS id`);
                this.id = resultado.id;
                console.log('Contato salvo com ID: ', this.id);
            } else {
                await db.runAsync(
                    `UPDATE contatos SET nome = ?, sobrenome = ?, email = ?, telefone = ? WHERE id = ?;`,
                    [this.nome, this.sobrenome, this.email, this.telefone, this.id]
                );
                console.log("Contato atualizado com sucesso.");
            }
        } catch (error) {
            console.error("Erro ao salvar o contato:", error);
            throw error;
        }
    }
    async atualizar(nome, sobrenome, email, telefone) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;
        console.log("Contato atualizado localmente.");
    }
    async getId() {
        return this.id;
    }
    async delet(db)   {
        try {
            if (this.id === null) {
                throw new Error("Contato não salvo no banco de dados.");
            }
            else {
                await db.execAsync(`DELETE FROM contatos WHERE id = ${this.id};`);
                console.log("Contato deletado do banco de dados.");
                this.id = null; // Reseta o ID localmente
            }
        } catch (error) {
            console.error("Erro ao deletar o contato:", error);
            throw error;
        }
    }
    async mudaContato(db, id){
        try {
            const resultado = await db.getFirstAsync(`SELECT * FROM contatos WHERE id = ${id};`);  
            if (resultado) {
                this.id = resultado.id;
                this.nome = resultado.nome;
                this.sobrenome = resultado.sobrenome;
                this.email = resultado.email;
                this.telefone = resultado.telefone;
                console.log("Contato carregado do banco de dados:", this);
            }
            else {
                throw new Error("Contato não encontrado no banco de dados.");
            }
        } catch (error) {
            console.error("Erro ao carregar o contato:", error);
            throw error;
        }
    }
}
