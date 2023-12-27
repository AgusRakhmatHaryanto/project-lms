const express = require("express");
const route = express.Router();
const userController = require("../controllers/userControllers");

route.get('/', userController.getAllUsers)
route.get('/:id', userController.getUserById)
route.post('/', userController.createUser)
route.post('/admin', userController.createUserByAdmin)
route.put('/:id', userController.updateUser)
route.delete('/:id', userController.deleteUser)

module.exports = route;
