
//Ref: https://gabrieleromanato.name/nodejs-renaming-files-recursively
//Ref: http://nephewapps.com/2018/09/09/programmatically-edit-any-file-in-nodejs/
'use strict';

const path = require('path');
const fs = require('fs');

const listDir = (dir, fileList = []) => {

    let files = fs.readdirSync(dir);

    files.forEach(file => {
        let name = file.replace(':', '');
        let title = name.split('.md')[0];
        let src = path.join(dir, file);
        let newSrc = path.join(dir, name);
        let oldContent = fs.readFileSync(path.join(dir, file), 'utf-8');
        let newTitle = title.replace(/-/g, ' ')
        fileList.push({
            oldSrc: src,
            newSrc: newSrc,
            oldContent: oldContent,
            newContent: `---\r\nid: ${title}\r\ntitle: ${newTitle}\r\n---\r\n\r\n`,
        });
    });

    return fileList;
};

let foundFiles = listDir('../docs');
foundFiles.forEach(f => {
    fs.unlinkSync(f.oldSrc);
    fs.writeFileSync(f.newSrc, f.newContent + f.oldContent);
});