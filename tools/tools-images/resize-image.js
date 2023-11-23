const { searchImages } = require('./search-images.js');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const directoryPath = process.argv[2];
const scalePercent = 70;

function resizeImage(inputImagePath, outputImagePath, scalePercent) {
    sharp(inputImagePath).metadata((err, metadata) => {
        if (err) {
            console.error('Lỗi khi đọc metadata: ' + err);
            return;
        }
        const newWidth = Math.round(metadata.width * scalePercent / 100);
        const newHeight = Math.round(metadata.height * scalePercent / 100);

        sharp(inputImagePath)
            .resize({ width: newWidth, height: newHeight })
            .toFile(outputImagePath, (err, info) => {
                if (err) {
                    console.error('Lỗi khi resize: ' + err);
                } else {
                    console.log(info);
                    console.log('Ảnh đã được resize và đổi tên thành ' + outputFileName);
                }
            });
    });
}

const imagesPath = searchImages(directoryPath);
console.log(imagesPath);
imagesPath.forEach(image => {
    const outputDirectory = path.dirname(image);
    const { name, ext } = path.parse(image);
    const outputFileName = name + '_resize' + ext;
    const outputImagePath = path.join(outputDirectory, outputFileName);
    resizeImage(image, outputImagePath, scalePercent);
});