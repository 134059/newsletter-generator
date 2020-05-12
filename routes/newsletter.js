var express = require('express');
var router  = express.Router();

let indexController = require('../controllers/index');
let submitController = require('../controllers/submit');

/* Actions for Newsletter */
router.get('/new', indexController.init_newsletter);
router.get('/:newsletter_id', indexController.show_newsletter);
router.post('/:newsletter_id/download', indexController.download_newsletter);
router.post('/:newsletter_id/edit', indexController.edit_newsletter);
router.post('/:newsletter_id/delete', indexController.delete_newsletter);

/* POST Submit Form */
router.post('/new/submit', submitController.submit_new);
router.post('/:newsletter_id/edit/submit', submitController.submit_edited);

module.exports = router;