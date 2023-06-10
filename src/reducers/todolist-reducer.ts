import { TodoListsType } from "../App";
import { v1 } from "uuid";


export const todolistReducer = (state: TodoListsType[], action: TodolistReducer) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id)
        case "NEW-TODOLIST":
            const newTodoList: TodoListsType = {
                id: action.payload.id, title: action.payload.title, filter: 'all'
            }
            return [newTodoList, ...state]
        case "UPDATE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.id
                ? {...tl, title: action.payload.title}
                : tl)
        case "UPDATE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.id
                ? {...tl, filter: action.payload.filter}
                : tl)
        default:
            throw new Error('wrong type')
    }
}

//general type of all actions
type TodolistReducer = RemoveTodoListAC | AddTodoListsACAC | UpdateTodoListTitleAC | ChangeTodoListFilterAC

//action type
type RemoveTodoListAC = ReturnType<typeof removeTodoListAC>

export const removeTodoListAC = (id: string) => {

    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

type AddTodoListsACAC = ReturnType<typeof addTodoListsAC>

export const addTodoListsAC = (title: string) => {
    const newTodoListId = v1();

    return {
        type: 'NEW-TODOLIST',
        payload: {
            id: newTodoListId,
            title
        }
    } as const
}

type UpdateTodoListTitleAC = ReturnType<typeof updateTodoListTitleAC>

export const updateTodoListTitleAC = (id: string, title: string) => {

    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}

type ChangeTodoListFilterAC = ReturnType<typeof changeTodoListFilterAC>

export const changeTodoListFilterAC = (id: string, filter: string) => {

    return {
        type: 'UPDATE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    }
}
