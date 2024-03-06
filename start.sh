#!/bin/bash

cd backend

# Starting compiler container
cd soc_docker_service
docker-compose up -d db redis
sleep 5
docker-compose up -d 
sleep 5

# # Starting mysql container
cd ..
# docker-compose up -d 
# sleep 5
# docker-compose up -d 
# sleep 5

# Starting nodejs server
npm start 
sleep 5

# # Start client
# cd ../client/chakra-client
