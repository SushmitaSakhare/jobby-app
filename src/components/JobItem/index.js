import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsData

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item-container">
        <div className="first-part-container">
          <div className="img-title-container">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="company logo"
            />
            <div className="title-rating-container">
              <h1 className="title-heading">{title}</h1>
              <div className="star-rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="loc-job-type-container">
              <div className="location-icon-container">
                <MdLocationOn className="icon" />
                <p className="location">{location}</p>
              </div>
              <div className="employment-type-container">
                <BsFillBriefcaseFill className="icon" />
                <p className="job-type">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="package">{packagePerAnnum}</p>
            </div>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="second-part-container">
          <h1 className="desc-heading">Description</h1>
          <p className="desc-para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
