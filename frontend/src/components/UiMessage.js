import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessage } from '../actions/ui'


export const UiMessage = () => {
    const {message, type} = useSelector(state => state.ui)
    const dispatch = useDispatch()

    const handleMessage = (e) => {
        e.target.style.animation = 'fadeOut'
        e.target.style.animationDuration = '.8s'
        setTimeout(() => {
            dispatch(deleteMessage())
        }, 800)
    }

    return (
        <>
            
            {
                message &&
                (<div 
                    className={`ui-message ui-message--${type}`}
                    onClick={handleMessage}    
                >
                    { message }
                </div>)
            }  

        </>
    )
}
