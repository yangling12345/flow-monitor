rm -rf ./dist
npm run build
cp .f2econfig.serve.js ./dist/.f2econfig.js
cp ./config.serve.js ./dist/config.js
cp ./start.js ./dist/start.js
cp -rf ./serve ./dist
cd ./dist/
mkdir node_modules
cp -rf ../node_modules/*-stat ./node_modules/
cp -rf ../node_modules/f2e-* ./node_modules/
cp -rf ../node_modules/tcp-port-used ./node_modules/
cp -rf ../node_modules/is2 ./node_modules/
cp -rf ../node_modules/deep-is ./node_modules/
cp -rf ../node_modules/q ./node_modules/
cp -rf ../node_modules/lodash ./node_modules/
cp -rf ../node_modules/mime* ./node_modules/
cp -rf ../node_modules/memory-tree ./node_modules/
cp -rf ../node_modules/clean-css ./node_modules/
cp -rf ../node_modules/uglify-js ./node_modules/
cp -rf ../node_modules/source-map* ./node_modules/
cp -rf ../node_modules/etag ./node_modules/
cp -rf ../node_modules/oscfg ./node_modules/
cp -rf ../node_modules/ini ./node_modules/
cp -rf ../node_modules/formidable ./node_modules/
cd ..

tar -cvf ./web.tar ./dist