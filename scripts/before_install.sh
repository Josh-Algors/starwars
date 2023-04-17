#!/bin/bash

#download node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash . ~/.nvm/nvm.sh
nvm install node

#create working directory
DIR = "/var/www/html/codematics"

if [ -d "$DIR"]; then
    echo "${DIR} exists"
else
    echo "creating ${DIR} directory"
    mkdir ${DIR}

fi