const Person = ({ person, deletePerson }) => {
  return (
      <>
      <p key={person.name}>{person.name} {person.number} 
      <button onClick={deletePerson}>delete</button>
      </p> 
      </>
  )
}

export default Person