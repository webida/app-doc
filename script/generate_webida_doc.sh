#!/bin/sh

#remove old result files
rm -rf doc

#download webida.js file from server using input parameter
#wget https://web2da.core1/webida-0.2.js --no-check-certificate --directory-prefix=src

#copy jsdoc
mkdir -p ./node_modules/jsdoc/templates/webida
cp -r ./src/templates/* ./node_modules/jsdoc/templates/webida/

#generate doc
./node_modules/.bin/jsdoc src/*.js -d doc -t ./node_modules/jsdoc/templates/webida/ -c ./node_modules/jsdoc/templates/webida/webida.conf.json

