import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import classes from './styles.module.scss';
import {ReactComponent as Logo} from "../../assets/icons/logo.svg";
import {ReactComponent as ArrowIcon} from "../../assets/icons/arrow.svg";
import Button from "../Buttons/Button";
import NoData from "../_common/NoData";
import SingleTask from "../_common/SingleTask";
import {IItem, IDefaultValue} from "../_common/globalTypes"
import DeleteModal from "../Modal/DeleteModal";
import AddOrEditTaskModal from "../Modal/AddOrEditTaskModal";
import _ from 'lodash'
import { changeStatusItem} from "../../store/actions/toDoList";

const statusOptions = [
    {
        label: 'All',
        path: 'all'
    },
    {
        label: 'Pending',
        path: 'pending'
    },
    {
        label: 'Completed',
        path: 'completed'
    },
    {
        label: 'Overdue',
        path: 'overdue'
    },
    {
        label: 'Removed',
        path: 'removed'
    },
]

const Wrapper = () => {
    const dispatch = useDispatch();
    const lists = useSelector((store: any) => store.toDoList.toDoLists)

    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<string | number>('');
    const [defaultValue, setDefaultValue] = useState<IDefaultValue>({
        status: 'pending',
    })
    const [openDeleteModal, setOpenDeleteModal] = useState<number>(0);
    const [openOptions, setOpenOptions] = useState(false);
    const [filter, setFilter] = useState<string>('all');

    const toDoLists = useMemo(()=> lists.filter((item: IItem) => {
        return filter === 'all'
            ? item
            : item.status === filter;
    }),[filter,lists])

    const editClick = (item: IItem) => {
        setDefaultValue(item)

        setOpenCreateOrUpdateModal(item.id)
    }

    const deleteClick = () => {
        dispatch(changeStatusItem({id:openDeleteModal,status:'removed'}))

        setOpenDeleteModal(0)
    }

    const changeCheck = (item: IItem) => {
        dispatch(changeStatusItem({
            id:item.id,
            status:item.status ==='completed'
                ?'pending'
                :'completed'
        }))
    }

    const changeSelect = (path: string) => {
        setFilter(path)
    }

    const closeMenu = (e: any) => {
        if (!e.target.closest(`[id="select_id"]`)) {
            setOpenOptions(false);
        }
    };

    const createClick =()=>{
        setOpenCreateOrUpdateModal('create')
        setDefaultValue({status: 'pending'})

    }
    useEffect(() => {
        window.addEventListener('click', closeMenu, true);
        return () => {
            window.removeEventListener('click', closeMenu, true);
        };
    }, []);


    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <Logo/>

                <div className={classes.header_search_wrapper}>


                    <div
                        id={'select_id'}
                        onClick={() => setOpenOptions(prev => !prev)}
                        role='button'
                        tabIndex={0}
                        className={`${classes.select} ${openOptions ? classes.active : ''}`}
                    >

                        {statusOptions.find((s) => s.path === filter)?.label}

                        <ArrowIcon/>

                        {openOptions && <div className={classes.options}>
                            {statusOptions.map((o) => (
                                <div
                                    key={o.path}
                                    className={`${classes.single_option} ${filter === o.path ? classes.active : ''}`}
                                    onClick={() => changeSelect(o.path)}
                                    role='button'
                                    tabIndex={0}>
                                    {o.label}
                                </div>
                            ))}
                        </div>}
                    </div>

                    <Button title='Create' onClick={createClick} create/>
                </div>
            </div>

            <div className={classes.body_wrapper}>

                <div className={classes.body_top}>

                    <div>
                        <p>All Tasks created</p>
                        <span>{lists.length}</span>
                    </div>

                    {filter !== 'all' && <div>
                      <p>{statusOptions.find((s) => s.path === filter)?.label}</p>
                      <span>{lists.filter((l: IItem) => l.status === filter).length}</span>
                    </div>}

                </div>

                <div className={classes.body_bottom}>
                    {_.isEmpty(toDoLists)
                        ? <NoData status={filter}/>
                        :toDoLists.map((item: IItem) => (
                            <SingleTask
                                key={item.id}
                                editClick={() => editClick(item)}
                                deleteClick={() => setOpenDeleteModal(item.id)}
                                changeCheck={() => changeCheck( item)}
                                item={item}
                            />
                        ))}
                </div>
            </div>

            <DeleteModal
                close={() => setOpenDeleteModal(0)}
                onClick={deleteClick}
                open={openDeleteModal}/>

            <AddOrEditTaskModal
                open={openCreateOrUpdateModal}
                close={() => setOpenCreateOrUpdateModal('')}
                defaultValue={defaultValue}
            />
        </div>

    );
};

export default Wrapper;
