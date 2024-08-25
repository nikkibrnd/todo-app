import { useState } from 'react';
import './notes.css'

function Notes() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, newTodo]);
            setNewTodo('');
        }
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const editTodo = (index) => {
            setIsEditing(true);
            setCurrentTodo({
                index: index,
                text: todos[index],
        });
        setNewTodo(todos[index]);
    };

    const updateTodo1 = () => {
        const updatedTodos = todos.map((todo, index) =>
            index === currentTodo.index ? newTodo : todo
        );
        setTodos(updatedTodos);
        setIsEditing(false);
        setNewTodo('');
    };

    const char = 100;
    const charLimit = char - newTodo.length;

    return(
        <div className="App">
            <h1 className="title">Notes App</h1>
            <div className="input-container">
                <textarea
                    type="text" 
                    value={newTodo} 
                    onChange={(e) => setNewTodo(e.target.value)} 
                    placeholder="Enter a new task" 
                    maxLength={100}
                />
                <div>
                    <span> {charLimit} Left </span>
                    <button onClick={isEditing ? updateTodo1 : addTodo}>
                        {isEditing ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                <li key={index} className="todo-item">
                    <span>{todo}</span>
                    <div className="actions">
                        <button onClick={() => editTodo(index)} className="edit-btn">
                            Edit
                        </button>
                        <button onClick={() => deleteTodo(index)} className="delete-btn">
                            Delete
                        </button>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Notes