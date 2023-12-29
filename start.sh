#!/bin/bash

# Starting compiler container
cd backend
cd judge0-v1.13.0
docker-compose up -d db redis
sleep 5
docker-compose up -d 
sleep 5

# Starting mysql container
cd ..
docker-compose up -d 
sleep 5

# Starting nodejs server
npm start 
sleep 5

# # Start client
# cd ../client/chakra-client
