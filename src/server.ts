import express from 'express'
import morgan from 'morgan'
import "express-async-errors"
import "dotenv/config"

const app = express()
const port = process.env.PORT

type Planet = {
    id: number,
    name: string,
};

type Planets = Planet[];

let planets: Planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];

app.use(morgan("dev"))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json(planets)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)    
})