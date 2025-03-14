import {promises as fs} from 'fs';

const main = async () => {
    const items = await fs.readdir('lojas', {withFileTypes:true});
    // console.log(items);
    
    for(let item of items){
        const type =item.isDirectory() ? 'pasta' : 'arquivo';

        console.log(`${item.name}: ${type}`);
    }
}

main();