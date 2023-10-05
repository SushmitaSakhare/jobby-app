import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const failureViewImg =
  'https://assets.ccbp.in/frontend/react-js/failure-img.png'

class AllJobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    checkboxInput: [],
    radioInput: '',
    searchInput: '',
    responseSuccess: false,
    apiStatus: apiStatusConstants.initial,
    apiJobStatus: apiJobStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiJobStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    // eslint-disable-next-line no-unused-vars
    const {checkboxInput, radioInput, searchInput} = this.state
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseProfile = await fetch(profileApiUrl, optionsProfile)
    if (responseProfile.ok === true) {
      const fetchedDataProfile = [await responseProfile.json()]
      const updatedDataProfile = fetchedDataProfile.map(eachItem => ({
        name: eachItem.profile_details.name,
        profileImageUrl: eachItem.profile_details.profile_image_url,
        shortBio: eachItem.profile_details.short_bio,
      }))
      this.setState({
        profileData: updatedDataProfile,
        apiStatus: apiStatusConstants.success,
        responseSuccess: true,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getJobDetails = async () => {
    this.setState({apiJobStatus: apiJobStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkboxInput, radioInput, searchInput} = this.state
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInput}&minimum_package=${radioInput}&search=${searchInput}`
    const optionsJob = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobs = await fetch(jobApiUrl, optionsJob)
    if (responseJobs.ok === true) {
      const fetchedDataJobs = await responseJobs.json()
      const updatedDataJobs = fetchedDataJobs.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsData: updatedDataJobs,
        apiJobStatus: apiJobStatusConstants.success,
      })
    } else {
      this.setState({apiJobStatus: apiJobStatusConstants.failure})
    }
  }

  getRadioOption = event => {
    this.setState({radioInput: event.target.id}, this.getJobDetails)
  }

  getInputOption = event => {
    const {checkboxInput} = this.state
    const inputNotInList = checkboxInput.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInput: [...prevState.checkboxInput, event.target.id],
        }),
        this.getJobDetails,
      )
    } else {
      const filteredData = checkboxInput.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState(
        // eslint-disable-next-line no-unused-vars
        prevState => ({checkboxInput: filteredData}),
        this.getJobDetails,
      )
    }
  }

  getProfileView = () => {
    const {profileData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData[0]
      return (
        <div className="profile-container">
          <img src={profileImageUrl} className="profile-icon" alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-description">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  onRetryProfile = () => {
    this.getProfileDetails()
  }

  getProfileFailureView = () => (
    <div className="failure-btn-container">
      <button
        className="failure-btn"
        type="button"
        onClick={this.onRetryProfile}
      >
        retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfileStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getProfileView()
      case apiStatusConstants.failure:
        return this.getProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onRetryJobs = () => {
    this.getJobDetails()
  }

  getJobFailureView = () => (
    <div className="failure-img-btn-container">
      <img className="failure-img" src={failureViewImg} alt="failure view" />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <div className="job-failure-container">
        <button
          className="failure-btn"
          type="button"
          onClick={this.onRetryJobs}
        >
          retry
        </button>
      </div>
    </div>
  )

  getJobsView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1>No jobs found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    ) : (
      <ul className="ul-job-item-container">
        {jobsData.map(eachItem => (
          <JobItem key={eachItem.id} jobsData={eachItem} />
        ))}
      </ul>
    )
  }

  renderJobStatus = () => {
    const {apiJobStatus} = this.state

    switch (apiJobStatus) {
      case apiJobStatusConstants.success:
        return this.getJobsView()
      case apiJobStatusConstants.failure:
        return this.getJobFailureView()
      case apiJobStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getCheckBoxesView = () => (
    <ul className="checkbox-container">
      {employmentTypesList.map(eachItem => (
        <li className="list-container" key={eachItem.employmentTypeId}>
          <input
            type="checkbox"
            className="input"
            id={eachItem.employmentTypeId}
            onChange={this.getInputOption}
            key={eachItem.label}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  getRadioButtonView = () => (
    <ul className="radio-btn-container">
      {salaryRangesList.map(eachItem => (
        <li className="list-container" key={eachItem.salaryRangeId}>
          <input
            type="radio"
            className="radio"
            name="option"
            id={eachItem.salaryRangeId}
            onChange={this.getRadioOption}
          />
          <label className="label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  submitSearchInput = () => {
    this.getJobDetails()
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {checkboxInput, searchInput, radioInput} = this.state
    return (
      <>
        <Header />
        <div className="all-jobs-container">
          <div className="sidebar-container">
            {this.renderProfileStatus()}
            <hr className="hr-line" />
            <h1 className="text">Type of Employment</h1>
            {this.getCheckBoxesView()}
            <hr className="hr-line" />
            <h1 className="text">Salary Range</h1>
            {this.getRadioButtonView()}
          </div>
          <div className="jobs-container">
            <div>
              <input
                type="search"
                className="search-input"
                value={searchInput}
                placeholder="Search"
                onChange={this.getSearchInput}
                onKeyDown={this.enterSearchInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-btn"
                onClick={this.submitSearchInput}
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default AllJobs
