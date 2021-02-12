import React, { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import './NewHabit.css';

const NewHabit = props => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const titleChangeHandler = event => {
    setEnteredTitle(event.target.value);
  };

  const submitHabitHandler = event => {
    event.preventDefault();
    props.onAddHabit(enteredTitle);
  };

  return (
    <section id="new-habit">
      <h2>Add a New Habit</h2>
      <form onSubmit={submitHabitHandler}>
        <Input
          type="text"
          label="Title"
          id="title"
          value={enteredTitle}
          onChange={titleChangeHandler}
        />
        <Button type="submit">ADD HABIT</Button>
      </form>
    </section>
  );
};

export default NewHabit;
