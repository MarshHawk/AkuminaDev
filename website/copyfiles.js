
//Ref: https://gabrieleromanato.name/nodejs-renaming-files-recursively
'use strict';

const path = require('path');
const fs = require('fs');

const listDir = (dir, fileList = []) => {

    let files = fs.readdirSync(dir);

    files.forEach(file => {

        let name = file.replace(':', '');;
        let src = path.join(dir, file);
        let newSrc = path.join(dir, name);
        fileList.push({
            oldSrc: src,
            newSrc: newSrc
        });
    });

    return fileList;
};

let foundFiles = listDir('~/../AkuminaDev.wiki');
foundFiles.forEach(f => {
    fs.renameSync(f.oldSrc, f.newSrc);
});