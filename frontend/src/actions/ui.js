import { types } from '../types/types'

export const setMessage = (message, type) => ({
    type: types.uiSetMessage,
    payload: {
        message,
        type
    }
})

export const deleteMessage = () => ({
    type: types.uiDeleteMessage
})

export const initLoading = () => ({
    type: types.uiInitLoading,
})

export const endLoading = () => ({
    type: types.uiEndLoading,
})