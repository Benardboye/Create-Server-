const express = require('express')
const dotenv = require('dotenv')
const {getGoals, setGoals, updateGoals, deleteGoals} = require('../controller/goalController')
const { protect } = require('../middleware/authMiddleware')
const router  = express.Router()
// router.get('/', getGoals)

// router.post('/', setGoals)

// router.put('/:id', updateGoals)

// router.delete('/:id', deleteGoals)

            //SAME AS

router.route('/').get(protect, getGoals).post( protect, setGoals)
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals)

module.exports = router 