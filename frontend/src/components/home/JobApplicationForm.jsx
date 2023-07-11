import React, {useState} from "react";
import axios from "axios";
import "./JobApplicationForm.css";

const JobApplicationForm = ({UpdateOrNewApplicationFlag, FalseJobApplicationForm, ApplicationIdFromApi, companyFromApi, positionFromApi, statusFromApi, setListItems, userNameFromApi}) => {
  const [applicationId, setapplicationId] = useState(ApplicationIdFromApi || '');
  const [company, setCompany] = useState(companyFromApi || '');
  const [position, setPosition] = useState(positionFromApi || '');
  const [status, setStatus] = useState(statusFromApi || '');
  const username = userNameFromApi; 

  const CloseFormAndFetchAllApplications = async () => {
    // after completion of SaveNewApplication and EditApplication, this function gets executed which closes the JobApplicationForm form component using FalseJobApplicationForm and make a api call to fetch all applications 
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${username}/getAllApplication`);
      const { data } = response;
      setListItems(data);
    } catch (error) {
      console.log(error.message); // Handle any error
    }
  };

  const SaveNewApplication = async (e) => {
    e.preventDefault();

    // Create the request payload
    const requestBody = {
      company,
      position,
      status,
    };

    try {
      // Send the POST request to the API endpoint using Axios
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${username}/newApplication`, requestBody);

      FalseJobApplicationForm();
      CloseFormAndFetchAllApplications();

      setapplicationId('');
      setCompany('');
      setPosition('');
      setStatus('');

    } catch (error) {
      console.log(error.message); // Handle any network or server error
    }
  };

  const EditApplication = async (e) => {
    e.preventDefault();

    // Create the request payload
    const requestBody = {
      _id: applicationId,
      company,
      position,
      status,
    };

    try {
      // Send the PATCH request to the API endpoint using Axios
      await axios.patch(`${process.env.REACT_APP_BASE_URL}${username}/updateApplication`, requestBody);

      FalseJobApplicationForm();
      CloseFormAndFetchAllApplications();

      setapplicationId('');
      setCompany('');
      setPosition('');
      setStatus('');

    } catch (error) {
      console.log(error.message); // Handle any network or server error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (UpdateOrNewApplicationFlag === "new") {
      SaveNewApplication(e);
    } else if (UpdateOrNewApplicationFlag === "update") {
      EditApplication(e);
    }
  };

  return (
    <div className="box">
        <div className="job-applicatin-form">
        <form onSubmit={handleSubmit}>
          <div className="overlap">
            <button type="submit" className="save-button">
              <div className="job-application-form-overlap-group">
                <div className="text-wrapper">Save</div>
              </div>
            </button>
            <button className="cancel-button" onClick={FalseJobApplicationForm}>
              <div className="job-application-form-overlap-group">
                <div className="text-wrapper">Cancel</div>
              </div>
            </button>
            <input className="status-input-field" onChange={(e) => setStatus(e.target.value)} placeholder="Enter application status ..." value={status}>
            </input>
            <div className="text-wrapper-3">Status</div>
            <input className="position-input-field" onChange={(e) => setPosition(e.target.value)} placeholder="Enter position name ..." value={position}>
            </input>
            <div className="text-wrapper-4">Position</div>
            <input className="company-input-field" onChange={(e) => setCompany(e.target.value)} placeholder="Enter company name ..." value={company}>
            </input>
            <div className="text-wrapper-5">Company</div>
            <div className="text-wrapper-6">Job Application Details</div>
          </div>
        </form>
        </div>
    </div>
  );
};

export default JobApplicationForm;
