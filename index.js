const express = require("express")
const morgan = require("morgan")

const PORT = 3001
const app = express()

app.use(express.json())

morgan.token('body', request => {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
    response.send("<h1>hello</h1>")
})

personsData = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
    response.json(personsData)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = personsData.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = personsData.map(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            "error": "content missing"
        })
    }

    if (!body.name || !body.number) {
        return response.status(400).json({
            "error": "missing name or number"
        })
    }

    const found = personsData.find(p => p.name === body.name) ? true : false
    
    if (found) {
        return response.status(409).json({
            "error": "name must be unique"
        })
    }

    const person = {
        id: Math.floor(Math.random() * 103193139010311),
        name: body.name,
        number: body.number
    }

    personsData = personsData.concat(person)

    response.json(person)
})

app.get('/info', (request, response) => {
    const people = persons.length
    const date = new Date()
    response.send(
        `<p>phonebook has info for ${people} people</p>
        <p>${date}</p>`
    )
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})