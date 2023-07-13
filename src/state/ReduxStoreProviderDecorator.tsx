import React from "react";
import { Provider } from "react-redux";
import {AppRootStateType } from "./store";
import { combineReducers, legacy_createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", completed: true},
            {id: v1(), title: "JS", completed: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", completed: false},
            {id: v1(), title: "React Book", completed: true}
        ]
    }
};


export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
