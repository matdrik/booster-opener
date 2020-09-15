const express = require('express');
const router = express.Router();

const Booster = require('../models/Booster');

router.get('/', async (req, res) => {
   res.json(await Booster.find());
});

router.post('/', async (req, res) => {
   const booster = new Booster(req.body);
   await booster.save();
   res.json({state: 'success'});
});

// router.get('/:id', async (req, res) => {
//    res.json(await Booster.findById(req.params.id));
// });

// router.put('/:id', async (req, res) => {
//    await Booster.findByIdAndUpdate(req.params.id, req.body);
//    res.json({state: 'updated'});
// });

// router.delete('/:id', async (req, res) => {
//    await Booster.findByIdAndRemove(req.params.id);
//    res.json({state: 'deleted'});
// });

module.exports = router;