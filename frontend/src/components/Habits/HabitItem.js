import React from 'react';

import Button from '../Button/Button';
import './HabitItem.css';

const HabitItem = props => {
    return (
        <section className="habit-item">
            <li>
                <h2>{props.name}</h2>
            </li>
            <Button type="delete-habit">DELETE</Button>
        </section>
    );
};

export default HabitItem;