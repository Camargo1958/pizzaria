import {Router, Request, Response} from 'express';

import {CreateUserController} from './controllers/user/CreateUserController';

import { AuthUserController } from './controllers/user/AuthUserController';
import { hashSync } from 'bcryptjs';

const router = Router();

router.get('/teste', (req: Request, res: Response)=>{
    return res.json({nome: 'Sujeito Pizza'});
    //throw new Error('Erro ao fazer esta requisição');
});

//-- ROTAS USER -- 
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

export { router };