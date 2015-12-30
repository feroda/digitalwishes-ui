#!/bin/bash

ionic build
cp platforms/browser/build/package.zip ../fabrianodigital/ui/
cd ../fabrianodigital/ui/
unzip package.zip
cd -

# During package.zip decompression I get error in some binary files

cp -v ./www/lib/slick-carousel/slick/ajax-loader.gif ../fabrianodigital/ui/lib/slick-carousel/slick/
cp -av ./www/test_data/* ../fabrianodigital/ui/test_data/
cp -av ./www/img/* ../fabrianodigital/ui/img/
cp -v ./www/lib/slick-carousel/slick/fonts/slick.woff ../fabrianodigital/ui/lib/slick-carousel/slick/fonts/
cp -v ./www/lib/ionic/fonts/ionicons.woff ../fabrianodigital/ui/lib/ionic/fonts/
cp -v ./www/lib/ionic/fonts/ionicons.eot ../fabrianodigital/ui/lib/ionic/fonts/

