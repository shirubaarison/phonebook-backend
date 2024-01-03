const express = require("express")
const PORT = 3001
const app = express()

app.use(express.json())

app.get('/', (request, response) => {
    response.send("<h1>hello</h1>")
})

persons = [
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
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.map(p => p.id !== id)

    response.status(204).end()
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