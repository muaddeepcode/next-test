#!/bin/bash

npm run build
pm2 delete front2
pm2 start npm --name "front2" -- start -p 448