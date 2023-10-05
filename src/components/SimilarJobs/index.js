import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobs = props => {
  const {similarJobData} = props
  const {
    companyLogoUrl,
    jobDescription,
    employmentType,
    location,
    title,
    rating,
  } = similarJobData
  console.log(similarJobData)

  return (
    <li className="similar-job-container">
      <div className="img-job-title-container">
        <img
          src={companyLogoUrl}
          className="company-job-img"
          alt="similar job company logo"
        />
        <div className="title-job-rating-container">
          <h1 className="title-job-heading">{title}</h1>
          <div className="star-rating-container">
            <AiFillStar className="star-job-icon" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <div className="second-part-job-container">
        <h1 className="description-heading">Description</h1>
        <p className="description-para">{jobDescription}</p>
      </div>
      <div className="location-job-details-container">
        <div className="location-container">
          <MdLocationOn className="location-icon" />
          <p className="location-job">{location}</p>
        </div>
        <div className="employment-type-container">
          <p className="job-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
