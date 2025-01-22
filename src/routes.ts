import express, { Router } from 'express';
import path from 'path';

import { CreateUserController } from './controllers/webUser/CreateUserController';
import { AuthenticateUseController } from './controllers/webUser/AuthenticateUseController';
import { GetUserProfileController } from './controllers/webUser/DetailWebUserController';
import { UpdateUserController } from './controllers/webUser/UpdateUserController';
import { GetUsersController } from './controllers/webUser/GetUsersController';
import { UserAlreadyExistsController } from './controllers/webUser/UserAlreadyExistsController';
import { GetUserDataByIdController } from './controllers/webUser/GetUserDataByIdController';

import { CreateAppUserController } from './controllers/appUser/CreateAppUserController';
import { UpdateAppUserController } from './controllers/appUser/UpdateAppUserController';
import { CheckinUserController } from './controllers/appUser/CheckInUserController';

import { CreateEventoController } from './controllers/evento/CreateEventoController';
import { UpdateEventoController } from './controllers/evento/UpdateEventoController';
import { DeleteEventoController } from './controllers/evento/DeleteEventoController';
import { ListEventoController } from './controllers/evento/ListEventoController';
import { GetEventStatisticsController } from './controllers/evento/GetEventStatisticsController ';

import { GetAppUsersController } from './controllers/appUser/GetAppUsersController';
import { ListAllEventosController } from './controllers/evento/ListAllEventosController';

import { CreateAtividadeController } from './controllers/atividades/CreateAtividadeController';
import { DeleteAtividadeController } from './controllers/atividades/DeleteAtividadeController';
import { ListAtividadesByEventIdController } from './controllers/atividades/ListAtividadesByEventIdController';
import { ListAtividadesController } from './controllers/atividades/ListAtividadesController';
import { UpdateAtividadeController } from './controllers/atividades/UpdateAtividadeController';
import { VerificaAtividadesOrganizadorController } from './controllers/atividades/VerificaAtividadesOrganizadorController';

import { GetColaboradoresEventoController } from './controllers/responsaveis/eventos/GetColaboradorEventoController';
import { CreateColaboradorEventoController } from './controllers/responsaveis/eventos/CreateColaboradorEventoController';

import { CreateInscricoesController } from './controllers/inscricoes/CreateInscricoesController';
import { RemoveInscricaoController } from './controllers/inscricoes/RemoveInscricaoController';
import { ShowInscritosByAtividadeController } from './controllers/inscricoes/ShowInscritosByAtividadeController';



import { ChangeUserPermissionsController } from './controllers/admin/ChangeUserPermissionsController';




import { CheckOutUserController } from './controllers/appUser/CheckOutUserController';
import { UserController } from './controllers/appUser/userController';
import { CreateColaboradorAtividadeController } from './controllers/responsaveis/atividades/CreateColaboradorAtividadeController';
import { DeleteColaboradorEventoController } from './controllers/responsaveis/eventos/DeleteColaboradorEventoController';
import { DeleteColaboradorAtividadeController } from './controllers/responsaveis/atividades/DeleteColaboradorAtividadeController';
import { GetColaboradoresAtividadeController } from './controllers/responsaveis/atividades/GetColaboradoresAtividadeController';





const router = Router();





router.put('/permissions', new ChangeUserPermissionsController().handle);

// Web User
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthenticateUseController().handle);
router.get('/me', new GetUserProfileController().handle);
router.get('/users', new GetUsersController().handle);
router.get('/user', new GetUserDataByIdController().handle);
router.post('/check-email', new UserAlreadyExistsController().handler);
router.put('/user', new UpdateUserController().handle);


// App User
router.get('/app/user', new GetAppUsersController().handle);
router.post('/app/user', new CreateAppUserController().handle);
router.post('/app/user/checkin', new CheckinUserController().handle);
router.post('/app/user/checkOut', new CheckOutUserController().handle);
router.post('/app/user/create', new UserController().create);

router.put('/app/user', new UpdateAppUserController().handle);


// Evento
router.post('/eventos', new CreateEventoController().handle);
router.get('/eventos', new ListEventoController().handle);
router.get('/todos-eventos', new ListAllEventosController().handle);
router.get('/eventos/estatisticas', new GetEventStatisticsController().handle);
router.put('/eventos', new UpdateEventoController().handle);
router.delete('/evento', new DeleteEventoController().handle);


// Atividades
router.post('/atividades', new CreateAtividadeController().handle);
router.delete('/atividades', new DeleteAtividadeController().handle);
router.get('/evento/atividades', new ListAtividadesByEventIdController().handle);
router.get('/atividades', new ListAtividadesController().handle);
router.put('/atividades', new UpdateAtividadeController().handle);
router.get('/hasAtividades', new VerificaAtividadesOrganizadorController().handle)

// Colaboradores das atividades
router.post('/colaborador-atividade', new CreateColaboradorAtividadeController().handle);
router.get('/colaborador-atividade', new GetColaboradoresAtividadeController().handle);
router.delete('/colaborador-atividade', new DeleteColaboradorAtividadeController().handle);
// router.delete('/colaborador-evento', new DeleteColaboradorAtividadeController().handle);

// Colaboradores dos eventos
router.delete('/colaborador-evento', new DeleteColaboradorEventoController().handle);
router.post('/colaborador-evento', new CreateColaboradorEventoController().handle);
router.get('/colaborador-evento', new GetColaboradoresEventoController().handle);




// Inscrições
router.post('/inscrever', new CreateInscricoesController().handle);
router.delete('/inscrever', new RemoveInscricaoController().handle);
router.get('/inscricoes', new ShowInscritosByAtividadeController().handle);
router.get('/myInscriptions', new ShowInscritosByAtividadeController().handle);


router.get('/favicon.ico', (req, res) => res.status(204));


export { router };
