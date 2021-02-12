import React from 'react';

import HabitItem from './HabitItem';
import './HabitList.css';

const HabitList = props => {
  let content;
  if (!props.items || props.items.length === 0) {
    content = <p>Could not find any habits. Maybe create one?</p>;
  } else {
    content = (
      <ul className="habit-list">
        {props.items.map(p => (
          <HabitItem key={p.id} name={p.title} />
        ))}
      </ul>
    );
  }

  return <section id="habits">{content}</section>;
};

export default HabitList;