const fs = require('fs');
const path = require('path');
const directoryPath = process.argv[2];

function isImageFile(fileName) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    const ext = path.extname(fileName).toLowerCase();
    return imageExtensions.includes(ext);
}

function searchImages(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    let imageFiles = [];
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            imageFiles = imageFiles.concat(searchImages(filePath));
        } else if (isImageFile(file)) {
            imageFiles.push(filePath);
        }
    });
    return imageFiles;
}

const imageFiles = searchImages(directoryPath);

if (imageFiles) {
    console.log('Các file ảnh trong thư mục:');
    console.log(imageFiles);
}

module.exports = {
    searchImages
}