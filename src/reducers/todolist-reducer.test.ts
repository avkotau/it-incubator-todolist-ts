import { useState } from "react";
import { TodoListsType } from "../App";
import { v1 } from "uuid";
import {
    addTodoListsAC,
    changeTodoListFilterAC,
    removeTodoListAC,
    todolistReducer,
    updateTodoListTitleAC
} from "./todolist-reducer";





test.skip('correct todolist should be remove', () => {
    let todoListId_1 = v1();
    let todoListId_2 = v1();

    const startState: TodoListsType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ];

    const endTodoListState = todolistReducer(
        startState,
        removeTodoListAC(todoListId_1)
    )

    expect(Object.keys(endTodoListState).length).toBe(1)
    expect(endTodoListState[0].id).toBe(todoListId_2)
})


test('correct todolist should be added', () => {

    let todoListId_1 = v1();
    let todoListId_2 = v1();

    const startState: TodoListsType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ];

    const title = 'What to do'

    const endTodoListState = todolistReducer(
        startState,
        addTodoListsAC(title)
    )

    expect(Object.keys(endTodoListState).length).toBe(3)
    expect(endTodoListState[0].title).toBe(title)
})

test.skip('correct todolist should change title', () => {

    let todoListId_1 = v1();
    let todoListId_2 = v1();

    const startState: TodoListsType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ];

    const title = 'Updated title'

    const endTodoListState = todolistReducer(
        startState,
        updateTodoListTitleAC(todoListId_1, title)
    )

    expect(Object.keys(endTodoListState).length).toBe(2)
    expect(endTodoListState[0].title).toBe(title)
})

test.skip('correct change todolist filter', () => {

    let todoListId_1 = v1();
    let todoListId_2 = v1();

    const startState: TodoListsType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ];

    const filter = 'active'

    const endTodoListState = todolistReducer(
        startState,
        changeTodoListFilterAC(todoListId_1, filter)
    )

    expect(Object.keys(endTodoListState).length).toBe(2)
    expect(endTodoListState[0].filter).toBe(filter)
    expect(endTodoListState[1].filter).toBe('all')
})


