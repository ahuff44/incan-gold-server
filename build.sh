#!/bin/bash
export COMPOSE_FILE=./docker-compose.test.yml

# build and start the containers
docker-compose build
docker-compose up -d

cleanup(){
    docker-compose stop
}
trap cleanup EXIT

if ! docker-compose run --rm api npm run lint; then
  exit 1
fi
if ! docker-compose run --rm api npm run test; then
  exit 1
fi

echo 'All tests passed!'