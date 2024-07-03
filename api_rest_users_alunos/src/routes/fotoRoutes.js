import { Router } from "express";
import fotoController from "../controllers/FotoController";
import loginRequirted from '../middlewares/loginRequired'
const router = new Router();

router.post('/', loginRequirted, fotoController.store);

export default router;
