import React from 'react';

import Button from '../Button/Button';
import './HabitItem.css';

const HabitItem = props => {
    return (
        <section className="habit-item">
            <li>
                <h2>{props.name}</h2>
            </li>
            <form onSubmit={()=>{
                props.onDeleteHabit(props.name);
                console.log("deleting an habit")}
                }>
            <Button type="submit">DELETE</Button>
            </form>
        </section>
    );
};

export default HabitItem;