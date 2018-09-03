const walk  = require('walk');
const fs    = require('fs');

let files   = [];

const walker  = walk.walk('public/assets', { followLinks: false });

walker.on('file', (root, stat, next) => {
    const file = {
        path: root.replace('public/', '') + '/' + stat.name,
        name: stat.name.replace('.json', '')
    }

    files.push(file);

    console.log("::: File added:", file.name);

    next();
});

walker.on('end', () => {  
    require('fs').writeFile(
        './public/files.json',
        JSON.stringify(files),
        function (err) {
            if (err) {
                console.error('Crap happens');
                throw err
            } else {
                console.log('::: Tasks finished. The file.json was generated.');
            }
        }
    );
});