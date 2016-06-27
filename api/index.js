import express from 'express';
import body_parser from 'body-parser';
import { version } from '../package.json';

export function start_server() {
  const app = express();
  const router = express.Router();

  // Routes
  router.use('/', function(req, res, next) {
    console.log("processing request...");
    next();
  });

  router.use('/version', function(req, res) {
    res.send(`${version} (${process.env.NODE_ENV})`);
  });

  app.use(body_parser.urlencoded({extended: true }));
  app.use(body_parser.json());
  app.use('/', router);
  app.listen(3000);
}
