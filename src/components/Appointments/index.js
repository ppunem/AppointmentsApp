// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {TITLE: '', DATE: '', appointmentsList: [], isFilterActive: false}

  onChangeTitle = event => {
    this.setState({TITLE: event.target.value})
  }

  onChangeDate = event => {
    this.setState({DATE: event.target.value})
  }

  changeStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  filterActive = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  filterStarredAppointments = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  addNewAppointment = event => {
    event.preventDefault()
    const {TITLE, DATE} = this.state
    const formattedDate = format(new Date(DATE), `dd MMMM yyyy,EEEE`)

    const newAppointment = {
      id: v4(),
      title: TITLE,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      TITLE: '',
      DATE: '',
    }))
  }

  render() {
    const {TITLE, DATE} = this.state
    const filteredAppointments = this.filterStarredAppointments()

    return (
      <div className="bg">
        <div className="card">
          <h1 className="head">Add Appointment</h1>
          <div className="upper-part">
            <form onSubmit={this.addNewAppointment}>
              <label htmlFor="title" className="Label">
                TITLE
              </label>
              <input
                type="text"
                onChange={this.onChangeTitle}
                id="title"
                placeholder="Title"
                className="input-style"
                value={TITLE}
              />
              <label htmlFor="Date" className="Label">
                DATE
              </label>
              <input
                type="date"
                onChange={this.onChangeDate}
                id="Date"
                placeholder="dd/mm/yyyy"
                value={DATE}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="lower-part">
            <div className="appointments-starred-main-container">
              <h1 className="bottom-heading">Appointments</h1>
              <button
                type="button"
                className="starred-button"
                onClick={this.filterActive}
              >
                Starred
              </button>
            </div>
          </div>
          <ul className="appointmentsContainer">
            {filteredAppointments.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentDetails={each}
                changeStar={this.changeStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
