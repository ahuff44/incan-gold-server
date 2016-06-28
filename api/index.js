import parseInt from 'parse-int';
import express from 'express';
import health_check from 'express-healthcheck';
import body_parser from 'body-parser';
import yn from 'yn';
import { version } from '../package.json';
import _ from 'lodash';

export function start_server() {
  const db = {games: []};
  // var db = {games: [{id: 2, x: 45, players: [{id: 4}]}, {id: 3}], private: {x:3}};
  var _id = -1;
  function next_id() {
    _id += 1;
    return _id;
  }

  function error(res, msg) {
    res.status(404).json({error: msg});
  }
  function unimplemented(res, msg) {
    res.status(501).json({error: "This action/endpoint is not yet implemented"});
  }

  const router = express.Router()
    .use('/', function(req, res, next) {
      // debug url hits to console
      console.log(`${req.method} ${req.url}`);
      if (req.method === "POST") {
        console.log("req.body:");
        console.log(req.body);
      }
      next();
    })
    .use('/version', function(req, res) {
      res.send(`${version} (${process.env.NODE_ENV})`);
    })
    .use('/health_check', health_check())
    .get('/games', function(req, res) {
      // ------------------------------
      // Get list of all active game ids
      // ------------------------------
      var ids = _(db.games)
        .filter('active')
        .map(g => _.get(g, 'id'))
        .value();
      res.json({ids: ids});

      // TODO: wish I could do this:
      // res.json(_.get(db, 'games[].id'));
    })
    .post('/games', function(req, res) {
      // ------------------------------
      // Create a new game
      // ------------------------------

      // TODO: remove this hack (allow un-active game creation)
      var active;
      if (_.has(req.body, 'active')) {
        active = yn(req.body.active);
        if (active === null) {
          error(res, "Bad request");
          return;
        }
      } else {
        active = true;
      }

      var id = next_id();
      var game = {id: id, active: active};

      db.games.push(game);
      res.json(game);
    })
    .get('/games/:id', function(req, res) {
      // ------------------------------
      // Get the current state of a specific game
      // ------------------------------
      var id = parseInt(req.params.id);
      var game = _.find(db.games, _.iteratee({id: id}));
      if (!game) {
        error(res, "Invalid game id");
        return;
      } else {
        res.json(game);
      }
    })
    .get('/games/:id/players', function(req, res) {
      // ------------------------------
      // Get information on the game's players
      // ------------------------------
      unimplemented(res);
    })
    .post('/games/:id/players', function(req, res) {
      // ------------------------------
      // Join an existing game
      // ------------------------------
      unimplemented(res);
    })
    .post('/games/:id/move', function(req, res) {
      // ------------------------------
      // Send a move to be played in a specific game
      // ------------------------------
      unimplemented(res);
    });

  // TODO: remove this debug router
  const debug_router = express.Router()
    .use('/db', function(req, res) {
      res.json(db);
    });

  const app = express();
  app.use(body_parser.urlencoded({extended: true }));
  app.use(body_parser.json());
  app.use('/', router);
  app.use('/debug', debug_router);
  app.listen(3000);
}
