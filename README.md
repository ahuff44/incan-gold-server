# incan-gold-server

A RESTful API for playing [Incan Gold](http://aichallenge.org/).

With inspiration from
[connect-four](https://github.com/zachpendleton/connect-four)
and [aichallenge.org](http://aichallenge.org/)

## Local Development:

```bash
docker-compose build
docker-compose run --rm api npm install
docker-compose up
```

## Production:

```bash
rm docker-compose.override.yml
rm -rf node_modules
docker-compose build
docker-compose up
```
