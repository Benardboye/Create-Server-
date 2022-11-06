// const { text } = require("node:stream/consumers")
const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModel')
const User = require('../model/userModel')


//GET GOALS
const getGoals = asyncHandler(async(req, res) => {
const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

//SET GOALS
const setGoals = asyncHandler(async(req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text in the field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

//PUT GOALS
const updateGoals = asyncHandler(async(req, res) => {
    
    const goal = await Goal.findById(req.params.id) 
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)

    //CHECK FOR USER
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Ensure that the logged in user matched the gaol user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not autorized') 
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedGoal)
})

//DELETE GOALS
const deleteGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id) 
    if(!goal) {
        res.status(400).send('Goal not found')
    } 
    const user = await User.findById(req.user.id)

    //CHECK FOR USER
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Ensure that the logged in user matched the gaol user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not autorized') 
    }
        await goal.remove()
    res.status(200).json(goal)
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
} 