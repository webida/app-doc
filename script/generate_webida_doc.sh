#!/bin/sh

#remove old document source files
rm -f src/webida-0.2.js
rm -f src/fs.js
rm -f src/file.js

#remove old result files
rm -rf doc

#download webida.js file from server using input parameter
#wget https://web2da.core1/webida-0.2.js --no-check-certificate --directory-prefix=src

#generate doc
./node_modules/jsdoc/jsdoc src/webida-0.2.js src/fs.js src/file.js -d doc -t src/templates/docstrap/template/ -c src/templates/docstrap/template/webida.conf.json
