import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import NewHabit from './components/Habits/NewHabit';
import HabitList from './components/Habits/HabitList';
import './App.css';

function App() {
  const [loadedHabits, setLoadedHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHabits = async () => {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/habits');

      const responseData = await response.json();

      setLoadedHabits(responseData.habits);
      setIsLoading(false);
    };

    fetchHabits();
  }, []);


  const deleteHabitHandler = async (HabitName) => {
    try {
      //delete
      let hasError = false;
      const response = await fetch('http://localhost:5000/habits', {
        method: 'DELETE',
        body: JSON.stringify(HabitName),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        hasError = true;
      }
      
      const responseData = await response.json();

      if (hasError) {
        throw new Error(responseData.message);
      }
    }
    catch (error) {
      alert(error.message || 'Something went wrong deleting!');
    }
  };






  const addHabitHandler = async (HabitName) => {
    try {
      const newHabit = {
        title: HabitName,
      };
      let hasError = false;
      const response = await fetch('http://localhost:5000/habits', {
        method: 'POST',
        body: JSON.stringify(newHabit),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        hasError = true;
      }

      const responseData = await response.json();

      if (hasError) {
        throw new Error(responseData.message);
      }

      setLoadedHabits(prevHabits => {
        return prevHabits.concat({
          ...newHabit,
          id: responseData.habit.id
        });
      });
    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <NewHabit onAddHabit={addHabitHandler} />
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && <HabitList items={loadedHabits} onDeleteHabit={deleteHabitHandler}/>}
      </main>
    </React.Fragment>
  );
}

export default App;
