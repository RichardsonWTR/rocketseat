import express from 'express';
import ClassController from './controllers/ClassesController';

const routes = express.Router();
const classesController = new ClassController();

routes.post('/classes', classesController.Create);
routes.get('/classes', classesController.Index);

export default routes;