const { searchImages } = require('./search-images.js');
const fs = require('fs');
const path = require('path');
const sourceDir = process.argv[2];
const destinationDir = process.argv[3];

function isPngImage(fileName) {
    const imageExtensions = ['.png'];
    const ext = path.extname(fileName).toLowerCase();
    return imageExtensions.includes(ext);
}

function copyImages(sourceDir, destinationDir) {
    const imageFiles = searchImages(sourceDir);
    imageFiles.forEach(file => {
        if (isPngImage(file)) {
            const sourcePath = file;
            const destinationPath = path.join(destinationDir, path.basename(file));
            fs.copyFileSync(sourcePath, destinationPath);
            console.log(`Đã sao chép ${destinationPath} thành công.`);
        }
    });

    console.log('Quá trình sao chép hoàn tất.');
}

copyImages(sourceDir, destinationDir);