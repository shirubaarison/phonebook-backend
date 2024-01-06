require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', request => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let personsData = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(pers => {
        response.json(pers)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id).then(note => {
        response.json(note)
    })
    .catch(err => {
        response.status(404).end()
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    personsData = personsData.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const bd = request.body

    if (!bd) {
        return response.status(400).json({
            "error": "content missing"
        })
    }

    if (!bd.name || !bd.number) {
        return response.status(400).json({
            "error": "missing name or number"
        })
    }

    // const found = person.find({name: bd.name})
    // console.log(found)
    
    // if (found) {
    //     return response.status(409).json({
    //         "error": "name must be unique"
    //     })
    // }

    const person = new Person ({
        name: bd.name,
        number: bd.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/info', (request, response) => {
    const people = persons.length
    const date = new Date()
    response.send(
        `<p>phonebook has info for ${people} people</p>
        <p>${date}</p>`
    )
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})