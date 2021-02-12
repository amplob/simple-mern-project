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


  // const addProductHandler = async (productName, productPrice) => {
  //   try {
  //     const newProduct = {
  //       title: productName,
  //       price: +productPrice // "+" to convert string to number
  //     };
  //     let hasError = false;
  //     const response = await fetch('http://localhost:5000/product', {
  //       method: 'POST',
  //       body: JSON.stringify(newProduct),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (!response.ok) {
  //       hasError = true;
  //     }

  //     const responseData = await response.json();

  //     if (hasError) {
  //       throw new Error(responseData.message);
  //     }

  //     setLoadedProducts(prevProducts => {
  //       return prevProducts.concat({
  //         ...newProduct,
  //         id: responseData.product.id
  //       });
  //     });
  //   } catch (error) {
  //     alert(error.message || 'Something went wrong!');
  //   }
  // };

  return (
    <React.Fragment>
      <Header />
      <main>
        <NewHabit onAddHabit={addHabitHandler} />
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && <HabitList items={loadedHabits} />}
      </main>
    </React.Fragment>
  );
}

export default App;
