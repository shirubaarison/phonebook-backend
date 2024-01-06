require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

const app = express()

app.use(express.static('dist'))
app.use(express.json())
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

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
    .then(note => {
        if(note) {
            response.json(note)
        } else {
            response.status(404).end()
        }

    })
    .catch(err => next(err))
    
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    personsData = Person.findByIdAndDelete(id)
    .then(res => {
        response.status(204).end()
    })
    .catch(err => next(err))
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

    const person = new Person ({
        name: bd.name,
        number: bd.number
    })

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(err => next(err))
    
})

app.put('/api/persons/:id', (request, response, next) => {
    const bd = request.body

    const person = {
        name: bd.name,
        number: bd.number
    }

    Person.findByIdAndUpdate(bd.id, person, { new: true })
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.get('/info', (request, response) => {
    const date = new Date()
    Person.countDocuments({})
    .then(count => {
        response.send(
            `<p>phonebook has info for ${count} people</p>
            <p>${date}</p>`
        )
    })
    .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandlerer = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ "error": "malformatted id" })
    }

    next(error)
}

app.use(errorHandlerer)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})