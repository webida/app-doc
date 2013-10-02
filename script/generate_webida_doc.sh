#!/bin/sh

#remove old webida.js
rm -f src/webida.js

#download webida.js file from server using input parameter
if [ "$1" -gt "-1" ]; then
    wget https://$1/webida.js --no-check-certificate --directory-prefix=src
else
    wget https://webida.org/webida.js --no-check-certificate --directory-prefix=src
fi

#generate doc
./node_modules/jsdoc/jsdoc src/webida.js -d doc -t src/templates/webida/
