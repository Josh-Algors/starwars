#!/bin/bash
sudo chmod -R 777 /var/www/html/codematics

cd /var/www/html/codematics

#add npm and node to path
export NVM_DIR = "$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

#install modules
npm install
pm2 start npm --name "codematics"

node app.js > app.out.log 2 > app.err.log < /dev/null &