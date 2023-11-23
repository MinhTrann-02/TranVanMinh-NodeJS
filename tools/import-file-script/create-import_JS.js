const { constants } = require('buffer');
const fs = require('fs');
const path = require('path');
const directoryPath = process.argv[2];

function getFilePath(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    let scriptFiles = [];
    files.forEach(file => {
        const ext = path.extname(file);
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            scriptFiles = scriptFiles.concat(getFilePath(filePath));
        } else if (ext === '.ts') {
            const { dir, name } = path.parse(filePath)
            scriptFiles.push(dir + '/' + name);
        } else if (ext === '.js') scriptFiles.push(filePath);
    });
    return scriptFiles;
}

function createFile(directoryPath) {
    let filePaths = getFilePath(directoryPath);
    const relativeFilePaths = filePaths.map(filePath => {
        return './' + path.relative(__dirname, filePath) + '\'';
    });
    const indexFileContent = relativeFilePaths.map(filePath => `import '${filePath};`).join('\n');
    console.log(indexFileContent);
    return fs.writeFileSync('tools/import-file-script/index.js', indexFileContent)
}

createFile(directoryPath);