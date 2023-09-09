// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, changeStar} = props
  const {id, title, date, isStarred} = appointmentDetails

  const changeStarStatus = () => {
    changeStar(id)
  }

  const STAR = !isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  return (
    <li>
      <div className="container">
        <div className="title-star-container">
          <p className="title">{title}</p>
          <button type="button" data-testid="star" onClick={changeStarStatus}>
            <img src={STAR} alt="star" />
          </button>
        </div>
        <p className="date">{`Date: ${date}`}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
