require('dotenv').config()
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const NodeGeocoder = require('node-geocoder');

mongoose.connect(process.env["MONGODB_KEY"], { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Connected to MongoDB'))


const findLocation = (devices, statusCollection) => {
    devices.forEach(async (device) => {
        const statuses = await statusCollection.find({id: device }).toArray()
    })
}

router.post('/:c1', async(req, res) => {
    const uri = req.body.uri
    const collection1 = req.params.c1
    const collection2 = req.query.c2
    console.log(uri, collection1, collection2)

    let devices = []
    let finalResult = []

    try {
        const devicesCollection = db.collection(collection1)
        const data = await devicesCollection.find().sort({ createdAt: -1}).limit(30).toArray()
        data.forEach((device) => {
            devices.push(device.id)
        })


        const statusCollection = await db.collection(collection2)
        findLocation(devices, statusCollection)

        res.send({
            "name": "Ayush Majumdar",
            "contact": "1032190909@mitwpu.edu.in",
            "deviceID": devices,
            "message": "No matching status found for latest device IDs"
        })
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})

const options = {
    provider: 'google',
    fetch: "",
    apiKey: process.env["GOOGLE_KEY"],
    formatter: null
};
const geocoder = NodeGeocoder(options);

const getLatLong = async (address) => {
    const result = await geocoder.geocode(address)
    const latitude = result[0].latitude
    const longitude = result[0].longitude
    return [latitude, longitude]
}

router.post('/', (req, res) => {
    const addresses = req.body.address
    let resultAddress = []

    addresses.forEach(async (address) => {
        try {
            const latLong = await getLatLong(addresses)
            const finalAddress = { add: address, location: latLong}
            console.log(finalAddress)
            resultAddress.push(finalAddress)
        } catch (e) {
            console.log(e)
        }
    })

    res.end("Post sent successfully!");
})

module.exports = router



