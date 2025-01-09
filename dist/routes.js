"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importStar(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const CreateWebUserController_1 = require("./controllers/webUser/CreateWebUserController");
const AuthWebUserController_1 = require("./controllers/webUser/AuthWebUserController");
const DetailWebUserController_1 = require("./controllers/webUser/DetailWebUserController");
const UpdateWebuserController_1 = require("./controllers/webUser/UpdateWebuserController");
const GetAllUsersController_1 = require("./controllers/webUser/GetAllUsersController");
const UserAlreadyExistsController_1 = require("./controllers/webUser/UserAlreadyExistsController");
const GetUserDataByIdController_1 = require("./controllers/webUser/GetUserDataByIdController");
const CreateAppUserController_1 = require("./controllers/appUser/CreateAppUserController");
const UpdateAppUserController_1 = require("./controllers/appUser/UpdateAppUserController");
const CheckInUserController_1 = require("./controllers/appUser/CheckInUserController");
const CreateEventoController_1 = require("./controllers/evento/CreateEventoController");
const DeleteEventoController_1 = require("./controllers/evento/DeleteEventoController");
const CountEventoController_1 = require("./controllers/evento/CountEventoController");
const ListEventoController_1 = require("./controllers/evento/ListEventoController");
const GetEventStatisticsController_1 = require("./controllers/evento/GetEventStatisticsController ");
const GetAppUsersController_1 = require("./controllers/appUser/GetAppUsersController");
const ListAllEventosController_1 = require("./controllers/evento/ListAllEventosController");
const CreateAtividadeController_1 = require("./controllers/atividades/CreateAtividadeController");
const DeleteAtividadeController_1 = require("./controllers/atividades/DeleteAtividadeController");
const ListAtividadesByEventIdController_1 = require("./controllers/atividades/ListAtividadesByEventIdController");
const ListAtividadesController_1 = require("./controllers/atividades/ListAtividadesController");
const UpdateAtividadeController_1 = require("./controllers/atividades/UpdateAtividadeController");
const VerificaAtividadesOrganizadorController_1 = require("./controllers/atividades/VerificaAtividadesOrganizadorController");
const UpdateColaboradorController_1 = require("./controllers/colaboradores/UpdateColaboradorController");
const CreateColaboradorAtividadeController_1 = require("./controllers/colaboradores/CreateColaboradorAtividadeController");
const CreateColaboradorEventoController_1 = require("./controllers/colaboradores/CreateColaboradorEventoController");
const CreateInscricoesController_1 = require("./controllers/inscricoes/CreateInscricoesController");
const RemoveInscricaoController_1 = require("./controllers/inscricoes/RemoveInscricaoController");
const ShowInscritosByAtividadeController_1 = require("./controllers/inscricoes/ShowInscritosByAtividadeController");
const ChangeUserPermissionsController_1 = require("./controllers/admin/ChangeUserPermissionsController");
const multer_2 = __importDefault(require("./config/multer"));
const CheckOutUserController_1 = require("./controllers/appUser/CheckOutUserController");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload('./tmp'));
router.put('/permissions', new ChangeUserPermissionsController_1.ChangeUserPermissionsController().handle);
// Web User
router.post('/user', new CreateWebUserController_1.CreateWebUserController().handle);
router.post('/session', new AuthWebUserController_1.AuthWebUserController().handle);
router.get('/me', new DetailWebUserController_1.DetailWebUserController().handle);
router.get('/users', new GetAllUsersController_1.GetAllUsersController().handle);
router.get('/user', new GetUserDataByIdController_1.GetUserDataByIdController().handle);
router.post('/check-email', new UserAlreadyExistsController_1.UserAlreadyExistsController().handler);
router.put('/user', new UpdateWebuserController_1.UpdateWebUserController().handle);
// App User
router.get('/app/user', new GetAppUsersController_1.GetAppUsersController().handle);
router.post('/app/user', new CreateAppUserController_1.CreateAppUserController().handle);
router.post('/app/user/checkin', new CheckInUserController_1.CheckinUserController().handle);
router.post('/app/user/checkOut', new CheckOutUserController_1.CheckOutUserController().handle);
router.put('/app/user', new UpdateAppUserController_1.UpdateAppUserController().handle);
// Evento
router.post('/eventos', new CreateEventoController_1.CreateEventoController().handle);
router.get('/count-eventos', new CountEventoController_1.CountEventosController().handle);
router.get('/eventos', new ListEventoController_1.ListEventoController().handle);
router.get('/todos-eventos', new ListAllEventosController_1.ListAllEventosController().handle);
router.get('/eventos/estatisticas', new GetEventStatisticsController_1.GetEventStatisticsController().handle);
router.delete('/evento', new DeleteEventoController_1.DeleteEventoController().handle);
// Atividades
router.post('/atividades', new CreateAtividadeController_1.CreateAtividadeController().handle);
router.delete('/atividades', new DeleteAtividadeController_1.DeleteAtividadeController().handle);
router.get('/evento/atividades', new ListAtividadesByEventIdController_1.ListAtividadesByEventIdController().handle);
router.get('/atividades', new ListAtividadesController_1.ListAtividadesController().handle);
router.put('/atividades', new UpdateAtividadeController_1.UpdateAtividadeController().handle);
router.get('/hasAtividades', new VerificaAtividadesOrganizadorController_1.VerificaAtividadesOrganizadorController().handle);
// Colaboradores das atividades
router.post('/colaborador', new CreateColaboradorAtividadeController_1.CreateColaboradorAtividadeController().handle);
router.post('/colaborador-evento', new CreateColaboradorEventoController_1.CreateColaboradorEventoController().handle);
router.put('/colaborador', new UpdateColaboradorController_1.UpdateColaboradorController().handle);
// Inscrições
router.post('/inscrever', new CreateInscricoesController_1.CreateInscricoesController().handle);
router.delete('/inscrever', new RemoveInscricaoController_1.RemoveInscricaoController().handle);
router.get('/inscricoes', new ShowInscritosByAtividadeController_1.ShowInscritosByAtividadeController().handle);
router.get('/myInscriptions', new ShowInscritosByAtividadeController_1.ShowInscritosByAtividadeController().handle);
router.use('/files', express_1.default.static(path_1.default.join(__dirname, '..', 'public/uploads')));
