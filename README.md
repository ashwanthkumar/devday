## Overview

DevDay is a monthly informal social event event for developers interested in all things technology; to share experiences, ideas, opinions and prespectives in software development.

## Getting started

* frontend: `npm start`
* server : `node server.js`

* Use http://localhost:3000 to do frontend changes (Watch, live reload etc)
* Use http://localhost:5000 incase you want to access backend apis also

## deploying

* login to the ec2 instance as devday
* go to `/home/devday/devday` and do the following
```
  git pull
  npm install
  pm2 reload devday -i 3
```
