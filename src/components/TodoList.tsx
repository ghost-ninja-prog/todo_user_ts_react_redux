import React, {useEffect} from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";


const TodoList: React.FC = () => {
    const {todos, page, limit, error, loading} = useTypedSelector(state => state.todo)
    const pages = [1, 2, 3, 4, 5]

    const {fetchTodos, setTodoPage} = useActions()

    useEffect(() => {
        fetchTodos(page, limit)
    }, [page])

    if (loading) {
        return <h1>Идет загрузка....</h1>
    }

    if (error) {
        return <h1>{ error }</h1>
    }

    return (
        <div>
            {
                todos.map(todo =>
                    <div key={todo.id}>{todo.id} - {todo.title}</div>
                )
            }
            <div style={{display: "flex", justifyContent: "space-between"}}>
                {
                    pages.map((p, i) =>
                        <div
                            onClick={() => setTodoPage(p)}
                            key={i}
                            style={{border: p === page ? '2px solid green' : '1px solid grey', padding: 10, cursor: "pointer" }}>
                            {p}
                        </div>
                    )
                }
            </div>


        </div>
    )
}

export default TodoList