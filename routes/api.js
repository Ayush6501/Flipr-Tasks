const express = require('express');
const router = express.Router()
const ApiData = require('../model/model')
const mongoose = require('mongoose')

const db = mongoose.connection

router.get('/:id', async (req, res) => {
    let devices = [];
    let deviceLocation = []

    try {
        const id = req.params.id

        const devicesCollection = db.collection('devices')
        const statusCollection = db.collection('status')
        const data = await devicesCollection.find().sort({createdAt: -1}).limit(30).toArray()
        data?.forEach((info) => devices.push(info.imei))

        devices.forEach(async (device) => {
            const location = await statusCollection.find({imei: device}).limit(50).toArray()
            deviceLocation.push(location)
        })

        console.log(deviceLocation)
        res.json(deviceLocation)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const collection = db.collection('status')
        const data = await collection.find().limit(50).toArray()
        console.log(data)
        res.json(data)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:body/:coll1/:coll2', (req, res) => {
    res.send(req.params.body)
})
module.exports = router
