# incan-gold

A RESTful API server for playing incan gold.

With inspiration from @zachpendleton's
[connect-four](https://github.com/zachpendleton/connect-four)
and [battleship](http://battleship.inseng.net/doc/api.html)

## Local Development:

```bash
docker-compose build
docker-compose run --rm api npm install --dev
docker-compose up
```

## Production:

```bash
rm docker-compose.override.yml
rm -rf node_modules
docker-compose build
docker-compose up
```
