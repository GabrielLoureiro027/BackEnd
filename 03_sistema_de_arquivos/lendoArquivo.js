import {promises as fs} from 'fs'
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const arquivo = path.join(__dirname, 'totalVendas.json');
try{
    const buffer = await fs.readFile(arquivo);
    console.log(String(buffer));
    console.log(JSON.parse(buffer));
}
catch (error){
    console.error(error.message)
}