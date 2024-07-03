import { Router } from "express";
import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";
const router = new Router();

//En una aplicacion de la vida real esto no existe porque daria acesso a cualquier usuario y sus informaciones
router.get('/', userController.index); // Lista usuarios
//router.get('/:id', userController.show); // Lista usuario


router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
