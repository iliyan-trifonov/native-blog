import Router from './router';
import User from './user';
import { Api } from './api';
import Blog from './blog';
import config from './config.json';

new Blog(document, window, config, Api, Router, User, Parse);
