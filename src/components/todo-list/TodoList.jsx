import React from 'react';

import TodoListItem from '../todo-list-item/TodoListItem';
import './TodoList.css';

const TodoList = ({ todos, deleteItem, markImportant, labelClick }) => {

    const elements = todos.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <li key={id} className="list-group-item">
                <TodoListItem onMarkImportant={() => markImportant(id)} onLabelClick={() => labelClick(id)} deleteItem={ () => deleteItem(id)} todos={ itemProps } />
            </li>
        );
    });
    return (
        <ul className="list-group todo-list">
            { elements }
        </ul>
    );
};

export default TodoList;