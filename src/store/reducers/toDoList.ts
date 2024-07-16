import {createReducer} from '@reduxjs/toolkit';
import {
    addNewToDoList,
    changeStatusItem,
    updateToDoList
} from "../actions/toDoList";
import {IFormInput} from "../../components/_common/globalTypes";

interface toDoLists {
    toDoLists: IFormInput[];
}

const initialState:toDoLists = {
    toDoLists: [],
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addNewToDoList, (state, {payload}) => {
            const newToDoList:IFormInput = {
                ...payload,
                id: Date.now(),
            };
            state.toDoLists=[newToDoList,...state.toDoLists];
        })
        .addCase(updateToDoList, (state, {payload}) => {
            state.toDoLists=state.toDoLists.map((item)=>item.id === payload.id ? payload:item)
        })

        .addCase(changeStatusItem,(state, {payload}) => {
            state.toDoLists=state.toDoLists.map((item)=>item.id === payload.id ? {
                ...item,
                status:payload.status,
            }:item)
        });
});

export default reducer;
