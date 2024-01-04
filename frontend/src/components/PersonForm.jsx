const PersonForm = ({ addPerson, newName, newNumber, handleNewName, handlewNewNumber }) => {
    return (
      <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNewName}/>
          </div>
          <div>
            number: <input value={newNumber} onChange={handlewNewNumber} />
          </div>
          <div>
            <button type="submit" >add</button>
          </div>
        </form>
    )
  }

export default PersonForm