import React, {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import editIcon from '../../assets/icons8-edit-1-5.svg.svg';
import JobApplicationForm from '../../components/home/JobApplicationForm.jsx';

const ListItem = ({_id, company, status, position, setJobApplicationForm}) => {
    const handleEditIconClick = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/Neeraj/getOneApplication/${_id}`);
        const { data } = response;
        setJobApplicationForm(data);
      } catch (error) {
        console.log(error.message); // Handle any error
      }
    };    

    return (
    <div className="list-item">
        <div className="overlap-2">
            <div className="text-wrapper">{company}</div>
            <div className="overlap-group-6">
              <div className="text-wrapper-2">{status}</div>
            </div>
            <div className="text-wrapper-3">{position}</div>
            <div className="edit-icon" onClick={handleEditIconClick}> 
              <img className="edit" alt="Edit" src={editIcon} />
            </div>
        </div>
    </div>
    );
}

const Home = () =>{
    const [listItems, setListItems] = useState([]);
    const [showJobApplicationForm, setShowJobApplicationForm] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [UpdateOrNewApplicationFlag, setUpdateOrNewApplicationFlag] = useState(null);
    const { username } = useParams();
    const navigate = useNavigate();

    const TrueJobApplicationForm = () => {
      setUpdateOrNewApplicationFlag("new");
      setShowJobApplicationForm(true);
    };

    const FalseJobApplicationForm = () => {
      setShowJobApplicationForm(false);
      setSelectedApplication(null);
    };

    const setJobApplicationForm = (application) => {
      setSelectedApplication(application);
      setUpdateOrNewApplicationFlag("update");
      setShowJobApplicationForm(true);
    };

    const RedirectToLogin = () => {
      navigate("/");
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/${username}`);
          const { data } = response;
          setListItems(data);
        } catch (error) {
          console.log(error.message); // Handle any error
        }
      };
  
      fetchData();
    }, [username]);

    return (
        <div className="macbook-air">
          <div className="overlap-wrapper">
            <div className="overlap">
              <div className="list">
                <div className="overlap-group">
                  <div className="text-wrapper-9">In Progress</div>
                  <button className="add-job-application" onClick={TrueJobApplicationForm}>
                    <div className="overlap-3">
                      <div className="text-wrapper-8">Add Job Application</div>
                    </div>
                  </button>
                  <div className="in-progress-list">
                    {listItems.map((item, index) => (
                        <ListItem key={index} _id={item._id} company={item.company} status={item.status} position={item.position} setJobApplicationForm={setJobApplicationForm}/>
                    ))}
                  </div>
                  <div className="text-wrapper-4">Accepted</div>
                  <div className="list-item-1">
                    <div className="div">
                      <div className="text-wrapper">Twitter</div>
                      <div className="div-wrapper">
                        <div className="text-wrapper-2">Accepted</div>
                      </div>
                      <div className="text-wrapper-3">Junior Software Engineer</div>
                      <div className="edit-icon">
                        <img className="edit" alt="Edit" src={editIcon} />
                      </div>
                    </div>
                  </div>                  
                </div>
              </div>
              <button className="log-out-button" onClick={RedirectToLogin}>
                    <div className="overlap-3">
                      <div className="text-wrapper-8">Log Out</div>
                    </div>
              </button>
              {showJobApplicationForm && (
                <JobApplicationForm 
                  UpdateOrNewApplicationFlag={UpdateOrNewApplicationFlag} 
                  FalseJobApplicationForm={FalseJobApplicationForm} 
                  ApplicationIdFromApi={selectedApplication?._id || null} 
                  companyFromApi={selectedApplication?.company || null} 
                  positionFromApi={selectedApplication?.position || null} 
                  statusFromApi={selectedApplication?.status || null}
                  setListItems={setListItems} 
                  userNameFromApi={username}/>)}
            </div>
          </div>
          
        </div>
      );                                                                                                          
};

export default Home;