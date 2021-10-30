const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController')

router.get('/search', siteController.search);
router.get('/detail/user/:id', siteController.detailUser);
router.post('/create-new-user', siteController.createNewUser);
router.get('/edit-user/:id', siteController.editUser);
router.post('/update-user', siteController.updateUser);
router.post('/delete-user/:id', siteController.deleteUser);
router.get('/', siteController.index);

module.exports = router;