import express from 'express';

import { getChats, getChat, createChat ,putChat} from './methods.js';

const api = express.Router();

api.get('/:id', getChat);
api.get('/', getChats);
api.post('/', createChat);
api.put('/:id', putChat);

export default api;