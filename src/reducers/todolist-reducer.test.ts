import { TodoListsType } from "../AppWithReducers";
import { v1 } from "uuid";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    removeTodoListAC,
    todolistReducer,
    updateTodoListTitleAC
} from "./todolist-reducer";


let todoListId_1: string;
let todoListId_2: string;

let startState: Array<TodoListsType>

beforeEach(() => {
    todoListId_1 = v1();
    todoListId_2 = v1();

    startState = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ];
})

test('correct todolist should be remove', () => {


    const endTodoListState = todolistReducer(
        startState,
        removeTodoListAC(todoListId_1)
    )

    expect(Object.keys(endTodoListState).length).toBe(1)
    expect(endTodoListState[0].id).toBe(todoListId_2)
})


test('correct todolist should be added', () => {

    const title = 'What to do'

    const endTodoListState = todolistReducer(
        startState,
        addTodoListAC(title)
    )

    expect(Object.keys(endTodoListState).length).toBe(3)
    expect(endTodoListState[0].title).toBe(title)
})

test('correct todolist should change title', () => {

    const title = 'Updated title'

    const endTodoListState = todolistReducer(
        startState,
        updateTodoListTitleAC(todoListId_1, title)
    )

    expect(Object.keys(endTodoListState).length).toBe(2)
    expect(endTodoListState[0].title).toBe(title)
})

test('correct change todolist filter', () => {

    const filter = 'active'

    const endTodoListState = todolistReducer(
        startState,
        changeTodoListFilterAC(todoListId_1, filter)
    )

    expect(Object.keys(endTodoListState).length).toBe(2)
    expect(endTodoListState[0].filter).toBe(filter)
    expect(endTodoListState[1].filter).toBe('all')
})


