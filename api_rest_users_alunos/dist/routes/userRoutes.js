"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
const router = new (0, _express.Router)();

//En una aplicacion de la vida real esto no existe porque daria acesso a cualquier usuario y sus informaciones
router.get('/', _UserController2.default.index); // Lista usuarios
//router.get('/:id', userController.show); // Lista usuario


router.post('/', _UserController2.default.store);
router.put('/', _loginRequired2.default, _UserController2.default.update);
router.delete('/', _loginRequired2.default, _UserController2.default.delete);

exports. default = router;
