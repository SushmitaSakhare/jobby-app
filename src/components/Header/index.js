import {Link, withRouter} from 'react-router-dom'
import {ImHome} from 'react-icons/im'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const websiteLogo = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

const Header = props => {
  const OnClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <ul className="header-container">
        <li className="logo-container">
          <Link className="link" to="/">
            <img className="logo" src={websiteLogo} alt="website logo" />
          </Link>
        </li>
        <li className="home-job-container">
          <Link className="link" to="/">
            <ImHome className="home-icon" />
            <h1 className="nav-text">Home</h1>
          </Link>
          <Link className="link" to="/jobs">
            <h1 className="nav-text">Jobs</h1>
          </Link>
        </li>
        <li>
          <FiLogOut className="home-icon" onClick={OnClickLogout} />
          <button type="button" className="logout-btn" onClick={OnClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
