import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { learners } from './data.jsx';
import  Learner  from './components/Learner.jsx';
import  Score from './components/Score.jsx';
import './App.css';

// 1. The layout and styling of the site is left up to your discretion. There are no layout or styling requirements, 
    // but you should always make sure your web applications are neat, sensible, and provide a good user experience.
// 2. Use the provided array of "learner" data below to initialize state as an object with a learners key in the <App> component.
// 3. Code the <App> component to display a <Learner> component for each learner object in the learners array being held in state.
// 4. Code the <Learner> component so that it:
    // Renders the learners's name & bio properties.
    // Renders a <Score> component for each score object in the learner's scores property.
// 5. Code the <Score> component so that it renders the score object's date & score properties.

function App() {
  const [learnerData, setLearnerData] = useState(learners);

  return (
    <>
    <div className="learner-profile">
      <h1>Learner Profile</h1>
      {learnerData.map((learner, index) => (
        <Learner
          key = {index}
          name = {learner.name}
          bio = {learner.bio}
          scores = {learner.scores}
        />
      ))}
    </div>
    </>
  );
}

export default App;
