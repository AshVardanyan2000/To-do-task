import React, {FC, forwardRef, useMemo, useState,} from 'react';
import Modal from './Modal';
import Button from '../Buttons/Button';
import classes from './style.module.scss';
import {useForm, Controller} from "react-hook-form";
import {date, number, object, string} from "yup";
import 'react-datepicker/dist/react-datepicker.css';
import {yupResolver} from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import {ReactComponent as CalendarIcon} from "../../assets/icons/calendar.svg";
import {useDispatch} from "react-redux";
import {addNewToDoList, updateToDoList} from "../../store/actions/toDoList";
import {IFormInput, IDefaultValue} from "../_common/globalTypes";
import Checkbox from "../Checkbox/Checkbox";

interface IAddOrEditTaskModal {
    open: string | number,
    close: () => void,
    defaultValue: IDefaultValue
}

interface ICustomInputProp {
    value?: string;
    onClick?: () => void;
}


const schema = object({
    title: string().required('Title is a required field'),
    description: string(),
    date: date(),
    id: number(),
    status: string().required(),
});


const CustomInput = forwardRef<HTMLButtonElement, ICustomInputProp>(({value, onClick}, ref) => (
    <button type={'button'} className={classes.date_picker_button} onClick={onClick} ref={ref}>
        <CalendarIcon/>

        <span>{value}</span>
    </button>
));

const AddOrEditTaskModal: FC<IAddOrEditTaskModal> = ({open, close, defaultValue}) => {
    const dispatch = useDispatch();
    const [showDate, setShowDate] = useState<boolean>(false);

    const {
        register, handleSubmit, setValue, control,
        reset, unregister, formState: {errors}
    } = useForm<IFormInput>({
        resolver: yupResolver(schema),
        defaultValues: defaultValue,
    });

    useMemo(() => {
        if (open) {
            if (defaultValue.date) setShowDate(true)

            reset(defaultValue);
        }
    }, [defaultValue,open]);

    const onCloseModal = () => {
        setShowDate(false)
        reset()
        close()
    }

    const onSubmit = async (data: IFormInput) => {
        if (open === 'create') {
            dispatch(addNewToDoList(data))
        } else {
            dispatch(updateToDoList(data))
        }

        onCloseModal()
    }

    const showDateClick = (check: boolean) => {
        setShowDate(check)
        if (check) {
            setValue('date', new Date())
        } else {
            unregister('date')
        }
    }

    return (
        <Modal
            className={classes.create_edit_modal_wrapper}
            open={!!open}
            onClose={onCloseModal}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Modal title</h2>

                <div className={classes.create_edit_modal_input_wrapper}>
                    <input
                        className={`${classes.create_edit_modal_input} ${errors.title ? classes.error : ''}`}
                        placeholder='Title'
                        {...register('title', {required: true})}
                    />

                    {errors.title && <p>{errors.title?.message}</p>}
                </div>

                <div className={classes.create_edit_modal_input_wrapper}>
                    <textarea
                        className={`${classes.create_edit_modal_input} ${errors.description ? classes.error : ''}`}
                        placeholder='Description'
                        {...register('description', {required: true})}
                    />

                    {errors.description && <p>{errors.description?.message}</p>}
                </div>

                <div className={classes.create_edit_modal_input_wrapper}>
                    <Checkbox
                        onChange={showDateClick}
                        label='With deadline'
                        checked={showDate}
                        className={classes.create_edit_modal_checkbox}
                    />

                    {showDate && <Controller
                      name="date"
                      control={control}
                      render={({field}) => (
                          <DatePicker
                              placeholderText="Select a date"
                              toggleCalendarOnIconClick
                              selected={field.value}
                              dateFormat="MM/dd/yyyy"
                              onChange={field.onChange}
                              customInput={<CustomInput/>}
                              minDate={new Date()}
                          />
                      )}
                    />}
                </div>


                <div className={classes.create_edit_modal_button_wrapper}>
                    <Button
                        title="Create task"
                        type='submit'
                        className={classes.btn}
                    />

                    <Button
                        title="Cancel"
                        onClick={onCloseModal}
                        className={classes.btn}
                    />
                </div>
            </form>

        </Modal>
    )
};

export default AddOrEditTaskModal;
