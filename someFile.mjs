import { writeFile } from 'node:fs';

function callback(error) {
    if (error) throw error;
    console.log('The file has been saved!');
}

writeFile('someTxtFile.txt', '(◕‿◕)', 'utf8', callback); 