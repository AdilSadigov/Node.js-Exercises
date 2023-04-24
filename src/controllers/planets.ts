import { Request, Response } from 'express'
import joi from 'joi'

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
        then: joi.number().integer().required(),
        otherwise: joi.number().integer()
    }),
    name: joi.string().min(3).required()
})

const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets)
}

const getOneById = (req: Request, res: Response) => {
    const { id } = req.params
    const planet = planets.find(p => p.id === Number(id))

    res.status(200).json(planet)
}

const create = (req: Request, res: Response) => {
    const { error, value } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const { id, name } = req.body
    const newPlanet: Planet = { id, name }
    planets = [...planets, newPlanet]

    res.status(201).json({ msg: "The planet was created"})
}

const updateById = (req: Request, res: Response) => {
    const { error, value } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const {id} = req.params
    const {name} = req.body
    planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p)

    res.status(200).json({ msg: "The planet was updated"})
}

const deleteByID = (req: Request, res: Response) => {
    const {id} = req.params
    planets = planets.filter((p) => p.id !== Number(id))

    res.status(200).json({ msg: "The planet was deleted"})
}

export { getAll, getOneById, create, updateById, deleteByID }