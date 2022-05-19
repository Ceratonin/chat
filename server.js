const express = require("express")

const app = express()
const server = require("http").Server(app)

const PORT = 4444

app.listen(PORT, console.log("Работаем"))