import {createAction} from '@reduxjs/toolkit';
import {IFormInput} from "../../components/_common/globalTypes";

interface IChangeCompletedObj{
    id:number;
    status:string;
}

export const addNewToDoList = createAction<IFormInput>('add_new_to_do_list');

export const updateToDoList = createAction<IFormInput>('update_to_do_list');

export const changeStatusItem = createAction<IChangeCompletedObj>('change_completed_item');
