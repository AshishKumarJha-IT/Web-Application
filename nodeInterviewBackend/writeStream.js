const fs = require('fs');

let content = 'I am pepcoder';

let writeStream = fs.createWriteStream('output.txt');

writeStream.write(content, 'utf-8');

writeStream.end();

writeStream.on('finish', function(){
    console.log('Writting completed');
})
