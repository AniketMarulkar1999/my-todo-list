import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from "uuid";

function Form({input, setInput, details, setDetails, todos, setTodos, editTodo, setEditTodo}) {

    const[isAddOrUpdate, setIsAddOrUpdate] = useState(false);
    
    const onFormSubmit = (e) => {

        e.preventDefault();
        if(isAddOrUpdate)
        {
            if(!editTodo)
            {
                setTodos([...todos, {id: uuidv4(), title: input, detail: details, completed: false}]);
                setInput("");
                setDetails("");
            }
            else{
                updateTodo(input, details, editTodo.id, editTodo.completed);
            }
        }
        else{
            setInput("");
            setDetails("");
        }
        
    }

    const updateTodo = (title, detail, id, completed) => {

        const newTodo = todos.map((todo) => 
            todo.id === id ? {title, detail, id, completed} : todo
        )
        setTodos(newTodo);
        setEditTodo("");
    }

    useEffect(() => {
        if(editTodo)
        {
            setInput(editTodo.title);
            setDetails(editTodo.detail);
        }
        else{
            setInput("");
            setDetails("");
        }
    }, [setInput, setDetails, editTodo]);

    return(
        <form onSubmit={onFormSubmit}>
            <div className='form-container'>
            <div className=''>
                <input 
                    id="input-text"
                    type="text"
                    placeholder='Task...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                />
            </div>
            <div>
                <textarea
                    id="details-text"                    
                    type="text" 
                    placeholder='Details...' 
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
            </div>
            <button 
                className='btn button-addOredit'
                type="submit"
                onClick={(e) => setIsAddOrUpdate(true)}
            >
                {editTodo ? "Edit" : "Add"}
            </button>
            <button 
                className='btn button-cancel'
            >
                Cancel
            </button>

            </div>
        </form>
    )
}

export default Form;