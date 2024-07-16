import React, { FC } from 'react';
import Modal from './Modal';
import Button from '../Buttons/Button';
import classes from './style.module.scss';

interface IDeleteModal {
  open: number | null,
  close: () => void,
  onClick: () => void;
}

const DeleteModal: FC<IDeleteModal> = ({open, close, onClick}) => (
  <Modal
    className={classes.deleteModal}
    open={!!open}
    onClose={close}
  >
    <div className={classes.delete_modal_info_wrapper}>
      <div>
        <h2>Delete task</h2>

        <p>Are you sure you want to delete this task?</p>
        <p>This action cannot be undone.</p>
      </div>


      <div className={classes.delete_modal_button_wrapper}>
        <Button
            title="Delete"
            onClick={onClick}
            className={classes.btn}
        />

        <Button
            title="Cancel"
            onClick={close}
            className={classes.btn}
        />
      </div>
    </div>
  </Modal>
);

export default DeleteModal;
