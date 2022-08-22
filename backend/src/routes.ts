import {Router, Request, Response} from 'express';

import {CreateUserController} from './controllers/user/CreateUserController'

const router = Router();

router.get('/teste', (req: Request, res: Response)=>{
    return res.json({nome: 'Sujeito Pizza'});
    //throw new Error('Erro ao fazer esta requisição');
});

//-- ROTAS USER -- 
router.post('/users', new CreateUserController().handle)

export { router };