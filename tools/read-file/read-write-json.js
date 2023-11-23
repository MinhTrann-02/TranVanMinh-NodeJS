const fs = require('fs');
const fileJson = process.argv[2];

function readJsonFile(fileJson) {
    const data = fs.readFileSync(fileJson, 'utf-8');
    const jsonData = JSON.parse (data);
    return jsonData;
}

function writeJsonFile (fileJson, data){
    return fs.writeFileSync(fileJson, JSON.stringify(data, null, 2), 'utf-8');
}

const jsonData = readJsonFile(fileJson);
console.log(jsonData);
if (jsonData) {
    jsonData.newKey1 = 'New Value 1';
    jsonData.newKey2 = 'New Value 2';

    writeJsonFile(fileJson, jsonData);
    console.log('Complete!');
}
console.log(readJsonFile(fileJson));