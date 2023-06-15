import { TasksStateType, TodoListsType } from "../App";
import { v1 } from "uuid";
import { AddTodoListsACType, RemoveTodoListACType } from "./todolist-reducer";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type TodolistReducer = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodoListsACType
    | RemoveTodoListACType


export const tasksReducer = (state: TasksStateType, action: TodolistReducer): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.preload.todoListId]: state[action.preload.todoListId]
                    .filter(t => t.id !== action.preload.taskId)
            }
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.preload.title, completed: false}
            return {
                ...state,
                [action.preload.todoListId]: [
                    newTask,
                    ...state[action.preload.todoListId]
                ]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.preload.todoListId]: [
                    ...state[action.preload.todoListId].map(t => t.id === action.preload.taskId
                        ? {...t, completed: action.preload.completed}
                        : t)
                ]
            }
        case "CHANGE-TASK-TITLE" :

            return {
                ...state,
                [action.preload.todoListId]: [
                    ...state[action.preload.todoListId].map(t => t.id === action.preload.taskId
                        ? {...t, title: action.preload.title}
                        : t)
                ]
            }
        case "NEW-TODOLIST":
            return {
                ...state,
                [action.payload.id]: []
            }
        case 'REMOVE-TODOLIST':
            delete state[action.payload.id]
            return {
                ...state
            }

        default:
            throw new Error('wrong type')
    }
}

export const removeTaskAC = (taskId: string, todoListId: string) => {

    return {
        type: 'REMOVE-TASK',
        preload: {
            taskId, todoListId
        }
    } as const
}

export const addTaskAC = (title: string, todoListId: string) => {

    return {
        type: 'ADD-TASK',
        preload: {
            todoListId, title
        }
    } as const
}

export const changeTaskStatusAC = (taskId: string, completed: boolean, todoListId: string) => {

    return {
        type: 'CHANGE-TASK-STATUS',
        preload: {
            todoListId, taskId, completed
        }
    } as const
}

export const changeTaskTitleAC = (title: string, taskId: string, todoListId: string) => {

    return {
        type: 'CHANGE-TASK-TITLE',
        preload: {
            todoListId, taskId, title
        }
    } as const
}


