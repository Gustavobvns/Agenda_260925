export default class Contato {
  constructor(nome, sobrenome, email, telefone){
    this.id = null;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.email = email;
    this.telefone = telefone;
  }

    //Atualiza os dados do OBJETO localmente e no banco de dados
    async atualizar(db, nome, sobrenome, email, telefone) {
        try {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;
        console.log("Contato atualizado localmente.");
        } catch (error) {
            console.error("Erro ao atualizar o contato:", error);
            throw error;
        }
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
    //Retorna o ID do OBJETO 'contato' atual
    async getId() {
        return this.id;
    }
    //Deleta o contato do banco de dados do banco de dados
    async excluir(db)   {
        try {
            if (this.id === null) {
                throw new Error("Contato não salvo no banco de dados.");
            }
            else {
                await db.execAsync(`DELETE FROM contatos WHERE id = ${this.id};`);
                console.log("Contato deletado do banco de dados.");
                 // Reseta os dados localmente
                this.id = null;
                this.nome = null;
                this.sobrenome = null;
                this.email = null;
                this.telefone = null;
            }
        } catch (error) {
            console.error("Erro ao deletar o contato:", error);
            throw error;
        }
    }
    //Muda o OBJETO 'contato' atual para o contato com o ID fornecido
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
    //consulta todos os contatos no banco de dados
    async consultaContatos(db){
        try {
            const resultado = await db.getAllAsync(`SELECT * FROM contatos;`);
            console.log("Contatos carregado do banco de dados:", resultado);
            return resultado;
        } catch (error) {
            console.error("Erro ao consultar tabela contatos:", error);
            throw error;
        }
    }
}
