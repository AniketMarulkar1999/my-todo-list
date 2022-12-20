import React from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

function TodoList({todos, setTodos, setEditTodo}){
    

    const handleDelete = ({id}) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }
    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if(item.id === todo.id)
                {
                    return {...item, completed: !item.completed};
                }
                return item;
            })
        )
    }
    const handleEdit = ({id}) => {
        const findTodo = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo);
    }

    const onExportToExcel = (todos) => {
        const filetype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const fileName = 'download';
       
        const ws = XLSX.utils.json_to_sheet(todos);
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: filetype});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return(
        <>
        <div className="list-item-container">
            {todos.map((todo) => (

            <ul className="list-item">
                <li key={todo.id}>
                    <span
                        class={todo.completed ? "complete" : ""}>{todo.title}</span>
                    <div>
                        <div className="task-button">
                            <button className="button-complete" onClick={() => handleComplete(todo)}>
                                <i className="fa fa-check-circle"></i>
                            </button>
                            <span className="tooltip-text">Complete</span>
                        </div>
                        <div className="task-button">
                            <button className="button-edit" onClick={() => handleEdit(todo)}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <span className="tooltip-text">Edit</span>
                        </div>
                        <div className="task-button">
                            <button className="button-delete" onClick={() => handleDelete(todo)}>
                                <i className="fa fa-trash"></i>
                            </button>
                            <span className="tooltip-text">Delete</span>
                        </div>       
                    </div>
                </li>
            </ul>
            ))}
        </div>
        <div>
            <button onClick={() => onExportToExcel(todos)}>Export to excel</button>
        </div>
        </>
    )
}

export default TodoList;