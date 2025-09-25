import { useSQLiteContext } from 'expo-sqlite';

export function getDataBase() {
    try{
    const db = useSQLiteContext();
    return db;
    }
    catch(error){
        console.error("Erro ao abrir o banco de dados:", error);
        throw error;
    }
}
