const express = require('express');
const router = express.Router();
const { createConsultation, getMyConsultations, getAllConsultations, updateStatus } = require('../controllers/consultationController');
const auth = require('../middleware/auth');

router.post('/', auth, createConsultation);
router.get('/my', auth, getMyConsultations);
router.get('/all', auth, getAllConsultations);
router.get('/', auth, getAllConsultations);
router.patch('/:id', auth, updateStatus);

module.exports = router;
