require('dotenv').config()
const express = require('express');
const router = express.Router()
const ApiData = require('../model/model')
const mongoose = require('mongoose')
const NodeGeocoder = require('node-geocoder');

const db = mongoose.connection

// router.get('/', async (req, res) => {
//     let devices = [];
//     let deviceLocation = []
//
//     try {
//         const id = req.params.id
//
//         const devicesCollection = db.collection('devices')
//         const statusCollection = db.collection('status')
//         const data = await devicesCollection.find().sort({createdAt: -1}).limit(30).toArray()
//         data?.forEach((info) => devices.push(info.imei))
//
//         // devices.forEach((device) => {
//         //     const location = statusCollection.find({imei: device}).limit(50).toArray()
//         //     console.log(location)
//         // })
//
//         console.log(devices)
//         console.log(devices[0])
//         console.log(typeof (devices[0]))
//
//         for (let i = 0; i < devices.length; i++) {
//             let location = await statusCollection.find({imei: devices[0]}).limit(50).toArray()
//             console.log(location)
//             deviceLocation.push(location)
//         }
//
//         console.log(deviceLocation)
//         res.json(deviceLocation)
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// })

router.get('/', async (req, res) => {
    try {
        // const collection = db.collection('devices')
        // const data = await collection.find().sort({createdAt: -1}).limit(50).toArray()
        const collection = db.collection('status')
        const data = await collection.find({"imei": "0860465040455275"}).sort({createdAt: -1}).toArray()
        console.log(data)
        res.json(data)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

const options = {
    provider: 'google',

    fetch: "",
    apiKey: process.env["GOOGLE_KEY"],
    formatter: null
};
const geocoder = NodeGeocoder(options);

router.post('/', (req, res) => {
    const addresses = req.body.address
    const resultAddress = []

    try {
        addresses.forEach(async (address) => {
            const result = await geocoder.geocode(address)
            const latitude = result[0].latitude
            const longitude = result[0].longitude
            const finalAddress = { add: address, location: [latitude, longitude]}
            console.log(finalAddress)
            resultAddress.push(finalAddress)
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    }
    res.end('POST request successfull');
})

module.exports = router



