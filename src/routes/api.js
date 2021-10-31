const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/APIController')

function apiRouter(app) {
   router.get('/users', apiController.getAllUsers); // Method GET ==> Read data
   router.post('/create-new-user', apiController.createUser); // Method POST ==> Create data
   router.put('/update-user', apiController.updateUser);// Method PUT ==> Updata data
   router.delete('/delete-user/:id', apiController.deleteUser);// Method DELETE ==> delete data
   app.use('/api/v1', router);

}

module.exports = apiRouter;