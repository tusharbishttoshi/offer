import React, { useEffect } from 'react'
import styles from './Model.module.css';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { ClosePopupState } from '../../../api/userLogInReducer';

function Model() {
    const { popup, popupMessage } = useSelector((state) => state.userLog)
    const dispatch = useDispatch()
    useEffect(() => {
        popup && setTimeout(() => {
            dispatch(ClosePopupState())
        }, 3000);
    }, [popup])
    return (<>
        {
            popup &&
            <div className={styles.model}>
                <div className={styles.messageBox}>
                    <div className={styles.closeBtn} onClick={() => dispatch(ClosePopupState())}>
                        <FaXmark />
                    </div>
                    {
                        popupMessage.status === "Success" ? <div className={styles.icon} >
                            <FaCheck size={25} style={{ color: "white" }} />
                        </div> : <div className={styles.error}>
                            <FaXmark size={25} style={{ color: "white" }} />
                        </div>
                    }

                    <h2>{popupMessage.status}</h2>
                    <p>{popupMessage.message}</p>
                </div>
            </div>
        }
    </>

    )
}

export default Model
