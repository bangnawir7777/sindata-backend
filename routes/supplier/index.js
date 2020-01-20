const router = require('express').Router();
module.exports = router;

const supplier = require('./supplier');

router.post('/', supplier.create);
router.put('/:id', supplier.update);
router.delete('/:id', supplier.remove);
router.get('/', supplier.findAll);
router.get('/:id', supplier.findById);