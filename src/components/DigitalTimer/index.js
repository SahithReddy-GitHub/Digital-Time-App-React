import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      minutes: 25,
      seconds: 0,
      isRunning: false,
      isEnabled: true,
    }

    this.intervalId = null
  }

  startTimer = () => {
    this.setState({isRunning: true, isEnabled: false})

    this.intervalId = setInterval(() => {
      const {minutes, seconds} = this.state

      if (minutes === 0 && seconds === 0) {
        this.stopTimer()
        return
      }

      if (seconds === 0) {
        this.setState({minutes: minutes - 1, seconds: 59})
      } else {
        this.setState({seconds: seconds - 1})
      }
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.intervalId)
    this.setState({isRunning: false, isEnabled: false})
  }

  onMinus = () => {
    const {minutes, isEnabled, isRunning} = this.state

    if (isEnabled && !isRunning && minutes > 0) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  onPlus = () => {
    const {isEnabled, isRunning} = this.state

    if (isEnabled && !isRunning) {
      this.setState(prevState => ({minutes: prevState.minutes + 1}))
    }
  }

  onReset = () => {
    clearInterval(this.intervalId)
    this.setState({
      minutes: 25,
      seconds: 0,
      isRunning: false,
      isEnabled: true,
    })
  }

  render() {
    const {minutes, seconds, isRunning} = this.state

    return (
      <div className="bg-custom">
        <h1 className="main-head">Digital Timer</h1>
        <div className="con">
          <div className="card1">
            <div className="time-con">
              <h1 className="time-head">{`${Math.floor(minutes / 10)}${
                minutes % 10
              }:${Math.floor(seconds / 10)}${seconds % 10}`}</h1>
              <p className="para"> {isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="card2">
            <div className="btn-con">
              <div className="star">
                <button
                  type="button"
                  onClick={isRunning ? this.stopTimer : this.startTimer}
                >
                  <img
                    src={
                      isRunning
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isRunning ? 'pause icon' : 'play icon'}
                    className="img"
                  />
                  <span className="icon-para">
                    {isRunning ? 'Pause' : 'Start'}
                  </span>
                </button>
              </div>
              <div className="star">
                <button type="button" onClick={this.onReset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="img"
                  />
                  <pan className="icon-para">Reset</pan>
                </button>
              </div>
            </div>
            <p className="set-para">Set Timer Limit</p>
            <div className="star2">
              <button type="button" onClick={this.onMinus}>
                <p className="icon-para poi">-</p>
              </button>
              <p className="icon-para bg">{minutes}</p>
              <button type="button" onClick={this.onPlus}>
                <p className="icon-para poi">+</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
