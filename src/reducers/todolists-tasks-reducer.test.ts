import { TasksStateType, TodoListsType } from "../AppWithReducers";
import { addTodoListAC, todolistReducer } from "./todolist-reducer";
import { tasksReducer } from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListsType> = []

    const action = addTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})



