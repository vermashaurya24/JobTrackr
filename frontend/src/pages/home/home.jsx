import React from 'react';
import './home.css';
import editIcon from '../../assets/icons8-edit-1-5.svg.svg';

const ListItem = ({text1, text2, text3}) => {
    return (
    <div className="list-item">
        <div className="overlap-2">
            <div className="text-wrapper">{text1}</div>
            <div className="overlap-group-6">
              <div className="text-wrapper-2">{text2}</div>
            </div>
            <div className="text-wrapper-3">{text3}</div>
            <div className="edit-icon">
            <img className="edit" alt="Edit" src={editIcon} />
            </div>
        </div>
    </div>
    );
}

const Home = () =>{
    const listItems = [
        { text1: 'TCS', text2: 'Applied', text3: 'Junior Software Engineer' },
        { text1: 'Meta', text2: 'Applied', text3: 'Junior Machine Learning Engineer' },
        { text1: 'Microsoft', text2: 'OA', text3: 'Software Engineer 1' },
        { text1: 'Amazon', text2: 'Interview R1', text3: 'Applied Scientist Intern' },
        { text1: 'Oracle', text2: 'Interview R2', text3: 'Software Engineer 1' },
        { text1: 'Google', text2: 'HR Round', text3: 'Software Engineer L3' },
    ];

    return (
        <div className="macbook-air">
          <div className="overlap-wrapper">
            <div className="overlap">
              <div className="list">
                <div className="overlap-group">
                  <div className="text-wrapper-9">In Progress</div>
                  <div className="add-job-application">
                    <div className="overlap-3">
                      <div className="text-wrapper-8">Add Job Application</div>
                    </div>
                  </div>
                  <div className="in-progress-list">
                    {listItems.map((item, index) => (
                        <ListItem key={index} text1={item.text1} text2={item.text2} text3={item.text3} />
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
            </div>
          </div>
        </div>
      );                                                                                                          
};

export default Home;