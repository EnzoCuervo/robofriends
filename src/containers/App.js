import React, { useState, useEffect } from "react";
import CardList from "../components/CardList.js";
import SearchBox from '../components/SearchBox.js';
import Scroll from "../components/Scroll.js";
import ErrorBoundry from '../components/ErrorBoundry.js';
import './App.css';


function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  // const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {setRobots(users)});
    // console.log(count);
  }, []) // [count]only run if count changes.

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  }

  const filterRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  })
  return !robots.length ? <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        {/* <button onClick={() => setCount(count + 1)}>Click Me!</button> */}
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterRobots}/>
          </ErrorBoundry>
        </Scroll>
      </div>
    );
}


export default App;