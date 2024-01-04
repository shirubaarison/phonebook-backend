const Notification = ({ message, sucess }) => {
    if (message === null) {
      return null
    }
    
    return (
      <div className={sucess ? "notification" : "notification error"}>
        {message}
      </div>
    )
  }

export default Notification