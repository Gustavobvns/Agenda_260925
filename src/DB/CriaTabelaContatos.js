export async function criarTabelaContatos(db) {
  try {
    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS contatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(20) NOT NULL,
        sobrenome VARCHAR(60) NOT NULL,
        email VARCHAR(60) NOT NULL,
        telefone VARCHAR(11) NOT NULL
        );`,
    );
    console.log("Tabela 'contatos' criada ou já existe.");
} catch (error) {
    console.error("Erro ao criar a tabela 'contatos':", error);
    throw error;
  }
}
