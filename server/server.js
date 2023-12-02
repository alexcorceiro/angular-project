const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors  = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const apiRouter = require('./routes/apiRoute')
require("dotenv").config()

const PORT = 4000

app.use(express.json())
app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    }));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", apiRouter)



mongoose.connect('mongodb://127.0.0.1:27017/twitter')
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch((err) => console.log('Erreur de connexion à la base de données', err));



app.listen(PORT, () => {
    console.log(` serving port ${PORT}`)
})
