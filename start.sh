#!/bin/bash

# Start Docker containers
cd backend
cd judge0-v1.13.0
docker-compose up -d db redis
sleep 5s
docker-compose up -d 
sleep 5s

# Start backend
cd backend
npm start 

# Start client
cd client/chakra-client
npm start 