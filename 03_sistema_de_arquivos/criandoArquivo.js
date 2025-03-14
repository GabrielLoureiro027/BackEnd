import {promises as fs} from 'fs'
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const arquivo = path.join(__dirname, "boas_vindas.txt")

try{
    await fs.appendFile(arquivo, "Saudações\n")
    console.log("arquivo criado com sucesso")
} catch (error){
    console.error(error.massage)
}