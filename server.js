const express = require("express");

const app = express()

app.get('/', (req, res) => {
    console.log('get /')
    res.send('get 3000 /')
})

app.listen(3000)