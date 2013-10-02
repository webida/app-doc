#!/bin/sh

#remove old webida.js
rm -f src/webida.js

#download webida.js file from server using input parameter
wget https://webida.org/webida.js --no-check-certificate --directory-prefix=src

#generate doc
./node_modules/jsdoc/jsdoc src/webida.js -d doc -t src/templates/webida/
