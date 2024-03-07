#!/bin/bash

systemctl stop nginx
killall node
docker container kill $(docker container ls -q)

cd backend

# Starting compiler container
cd soc_docker_service
docker-compose up -d db redis
sleep 5
docker-compose up -d 
sleep 5

# # Starting mysql container
cd ..

# Starting nodejs server
npm install
npm start &
sleep 5

# Build the frontend
cd ../frontend
npm install
npm run build
npm install -g serve

# Start nginx again
systemctl start nginx

# serve the frontend
nohup serve -s build