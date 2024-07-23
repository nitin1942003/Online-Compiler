const fs =require('fs');
const path = require('path')
const {v4: uuid} = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive: true});
}

const generateFile=async(language, code)=>{
    const jobId= uuid();
    const filenname = `${jobId}.${language}`;//edfed385-140a-4efd-84b9-a42b8e6380c1.cpp
    const filePath =path.join(dirCodes, filenname);
    fs.writeFileSync(filePath, code);
    return filePath;
};

module.exports = {
    generateFile,
};