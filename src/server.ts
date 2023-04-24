import express from 'express'
import morgan from 'morgan'
import joi from 'joi'
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

const schema = joi.object({
    id: joi.when(joi.ref('$method'), {
        is: 'POST',
        then: joi.number().required(),
        otherwise: joi.number()
    }),
    name: joi.string().min(3).required()
})

app.use(morgan("dev"))
app.use(express.json())

app.get('/api/planets', (req, res) => {
    res.status(200).json(planets)
})

app.get('/api/planets/:id', (req, res) => {
    const { id } = req.params
    const planet = planets.find(p => p.id === Number(id))

    res.status(200).json(planet)
})

app.post('/api/planets', (req, res) => {
    const { error, value } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const { id, name } = req.body
    const newPlanet = { id, name }
    planets = [...planets, newPlanet]

    res.status(201).json({ msg: "The planet was created"})
})

app.put('/api/planets/:id', (req, res) => {
    const { error, value } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const {id} = req.params
    const {name} = req.body
    planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p)

    res.status(200).json({ msg: "The planet was updated"})
})

app.delete('/api/planets/:id', (req, res) => {
    const {id} = req.params
    planets = planets.filter((p) => p.id !== Number(id))

    res.status(200).json({ msg: "The planet was deleted"})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)    
})