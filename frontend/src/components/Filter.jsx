const Filter = ({ newFilter, handleNewFilter }) => {
    return (
      <div>
          filter shown with <input value={newFilter} onChange={handleNewFilter}/>
      </div>
    )
  }

export default Filter