import React, {Component} from 'react';

import './TodoListItem.css';

const TodoListItem = (props) => {

    const {label, done, important} = props.todos;

    let classNames = 'todo-list-item';
    if (done) {
        classNames += ' done';
    }

    if (important) {
        classNames += ' important';
    }

    return (
        <span className={classNames}>
        <span
            className="todo-list-item-label"
            onClick={props.onLabelClick}>
          {label}
        </span>

        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={props.onMarkImportant}>
          <i className="fa fa-exclamation"/>
        </button>

        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={props.deleteItem}>
          <i className="fa fa-trash-o"/>
        </button>
      </span>
    );

}

export default TodoListItem