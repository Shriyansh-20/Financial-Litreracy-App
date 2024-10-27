import React, { useState } from 'react';
import Quiz from './Components/Quiz/Quiz';
import TopicSelection from './Components/TopicSelection/TopicSelection';
import axios from 'axios'; // Import Axios for making HTTP requests

const Quizhandle = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [data, setData] = useState(null); // State to hold fetched data

  const extractQuestions = (data) => {
    const questions = [];
    data.forEach(topicData => {
      Object.values(topicData).forEach(topicQuestions => {
        if (Array.isArray(topicQuestions)) {
          questions.push(...topicQuestions);
        }
      });
    });
    return questions;
  };
  
  

  const fetchData = async (category) => {
    try {
      const url=`http://localhost:5000/api/data/${category}`;
      const response = await axios.get(url);
      // console.log(url)
      // console.log(response.data);
      const questions = extractQuestions(response.data);
      // console.log(questions)
      setData(questions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    fetchData(topic); // Fetch data when a category is selected
  };

  const handleGoToHomepage = () => {
    setSelectedTopic(null); // Reset selected topic to return to the homepage
    setData(null); // Clear data when returning to the homepage
  };

  return (
    <div className="app-container">
      <div className="content">
        {/* Render Quiz if selectedTopic is not null and data[selectedTopic] is defined */}
        {selectedTopic && data ? (
          <Quiz
            questions={data}
            onGoToHomepage={handleGoToHomepage} // Pass the function to Quiz component
          />
        ) : (
          <TopicSelection onSelectTopic={handleSelectTopic} />
        )}
      </div>
    </div>
  );
};

export default Quizhandle;