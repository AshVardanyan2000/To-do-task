import React, {FC} from 'react';
import classes from "./styles.module.scss";
import {ReactComponent as FileIcon} from "../../assets/icons/file.svg";

const NoData:FC<{ status: string }> = ({status}) => (
    <div className={classes.body_bottom_no_data}>
        <FileIcon/>

        <p>You don't have <b>{status === 'all' ? 'tasks' : status}</b> registered yet.</p>
        {status === 'all'&&<p>Create tasks and organize your to-do items.</p>}
    </div>
);

export default NoData;
