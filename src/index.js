import React from "react"
import ReactDOM from 'react-dom'


const App = () => {
    return (
        <div>
            <h1>Hello React ToDo App</h1>
            <input placeholder='searchPanel'/>
        </div>
    )

}

ReactDOM.render(<App/>, document.getElementById('root'))