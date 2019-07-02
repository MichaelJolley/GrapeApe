import express = require('express');
import { Server } from 'http';

import { Helix } from './helix';
import { log } from './common';

export class Twitch {
  public app: express.Application;
  private http!: Server;
  private helix: Helix;

  constructor() {
    this.app = express();
    this.http = new Server(this.app);
    this.helix = new Helix();

    this.loadRoutes();
  }

  public start() {
    this.listen();
  }

  /**
   *
   */
  private loadRoutes = (): void => {

    // Get user by userId
    this.app.get('/users/id/:userId', async (req, res) => {
      log('info', `route: /users/id/:userId called with userId: ${req.params.userId}`);

      const payload: any = await this.helix.getUserById(req.params.userId);
      res.send(payload);
    });

    // Get user by username
    this.app.get('/users/:username', async (req, res) => {
      log('info', `route: /users/:username called with username: ${req.params.username}`);

      const payload: any = await this.helix.getUserByUsername(req.params.username);
      res.send(payload);
    });

    // Get latest follower by username
    this.app.get('/followers', async (req, res) => {
      log('info', `route: /followers called`);

      const payload: any = await this.helix.getFollowers();
      res.send(payload);
    });

    // Get all subscribers
    this.app.get('/subscribers', async (req, res) => {
      log('info', `route: /subscribers called`);

      const payload: any = await this.helix.getSubscribers();
      res.send(payload);
    });

    // Get stream info
    this.app.get('/stream', async (req, res) => {
      log('info', `route: /stream called`);

      const payload: any = await this.helix.getStream();
      res.send(payload);
    });
  }

  /**
   * Start the Node.js server
   */
  private listen = (): void => {
    this.http.listen(80, () => {
      log('info', 'listening on *:80');
    });
  };
}
