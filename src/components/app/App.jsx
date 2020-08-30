import React, {Component} from 'react';

import AppHeader from "../app-header/AppHeader"
import SearchPanel from "../search-panel/SearchPanel"
import TodoList from "../todo-list/TodoList"
import ItemStatusFilter from '../item-status-filter/ItemStatusFilter';
import ItemAddForm from "../item-add-form/ItemAddForm"


import './App.css';


export default class App extends Component {
    totalId = 1
    createItem = (label) => {
        return {
            label,
            important: false,
            done: false,
            id: this.totalId++
        }
    }
    state = {
        todoData : [
            this.createItem('Drink Coffee'),
            this.createItem('Make Awesome app'),
            this.createItem('Have a lunch')
        ],
        term: '',
        filter: 'all'
    }
    deleteItemEl = (id) => {
        this.setState((state) => {
            const newTodo = state.todoData.filter((el) => el.id !== id)
            return {
                todoData: newTodo
            }
        })
    }
    addItem = (text) => {
        console.log('Added: ', text)
        const newItem = this.createItem(text)
        this.setState((state) => {
            return {
                todoData: [...state.todoData, newItem]
            }
        })
    }

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex(el => el.id === id)
        let oldItem = arr[idx]
        let newItem = {...oldItem, [propName]: !oldItem[propName]}
        console.log(newItem)
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx+1)]
    }
    onMarkImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData:  this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    onLabelClick = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData:  this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    search = (items, term) => {
        if (term.length === 0) {
            return items
        }
        return items.filter( item => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    onSearchChange = (term) => {
        this.setState({term})
    }
    onFilterChange = (filter) => {
        this.setState({filter})
    }

    filter = (items, filter) => {
        switch (filter) {
            case 'all' :
                return items
            case 'active' :
                return items.filter(item => !item.done)
            case 'done' :
                return items.filter(item => item.done)
            default :
                return items
        }
    }


    render() {
        const {todoData, term, filter } = this.state
        const visibleItems = this.filter(this.search(todoData, term), filter)
        let doneCount = this.state.todoData.filter(el => el.done).length
        let importantCount = this.state.todoData.filter(el => el).length - doneCount
        return (
            <div className="todo-app">
                <AppHeader toDo={importantCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList deleteItem={this.deleteItemEl} markImportant={this.onMarkImportant} labelClick={this.onLabelClick} todos={visibleItems} />
                <ItemAddForm onAddItem={this.addItem} />

            </div>
        );
    }
};

