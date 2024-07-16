import React, {FC, useEffect} from 'react';
import classes from './styles.module.scss'
import Checkbox from "../Checkbox/Checkbox";
import moment from "moment";
import {ReactComponent as EditIcon} from '../../assets/icons/edit.svg';
import {ReactComponent as DeleteIcon} from '../../assets/icons/delete.svg';
import {IItem} from "./globalTypes";
import {useDispatch} from "react-redux";
import {changeStatusItem} from "../../store/actions/toDoList";
import _ from "lodash";


interface ISingleTaskProps {
    editClick: () => void;
    changeCheck: () => void;
    deleteClick: () => void;
    item: IItem
}

const checkOverdue = (date: Date) => {
    const sameDay = new Date(date).getDate() < new Date().getDate();
    const sameMonth = new Date(date).getMonth() < new Date().getMonth();
    const sameYear = new Date(date).getFullYear() < new Date().getFullYear();

    return (sameDay || sameMonth || sameYear)
}

const SingleTask: FC<ISingleTaskProps> = ({editClick, deleteClick, changeCheck, item}) => {
    const dispatch = useDispatch();
    const overdue = item.date ? checkOverdue(item.date) : false

    useEffect(() => {
        if (overdue) {
            dispatch(changeStatusItem({id:item.id,status:'overdue'}))
        }
    }, []);

    return (
        <div className={classes.task_wrapper}>
            <div className={classes.task_wrapper_left_group}>
                <Checkbox
                    onChange={changeCheck}
                    className={classes.checkbox}
                    checked={item.status === 'completed'}
                    disabled={item.status === 'removed'}
                />

                <div className={`${classes.task_info_wrapper} ${item.status !== 'pending' ? classes.disabled : ''}`}>
                    <p>{item.title}</p>

                    <p>{item.description}</p>

                    <div className={classes.task_info_status}>
                        {item.date && <p>{moment(item.date).format('DD/MM/YYYY')}</p>}

                        <p className={`${item.status}`}>{_.capitalize(item.status)}</p>
                    </div>
                </div>
            </div>


            <div className={classes.actions_wrapper}>
                {item.status === 'pending'
                    && <div onClick={editClick} role='button' tabIndex={0}>
                    <EditIcon/>
                  </div>}

                {item.status !== 'removed'
                    && <div onClick={deleteClick} role='button' tabIndex={0}>
                    <DeleteIcon/>
                  </div>}
            </div>


        </div>
    )
};

export default SingleTask;
