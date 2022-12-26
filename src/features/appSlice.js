import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: "app",
    initialState: {
        channel_id: null,
        channel_name: null
    },
    reducers: {
        setChannelID: (state, action) => {
            state.channel_id = action.payload
        },
        setChannelName: (state, action) => {
            state.channel_name = action.payload
        },
        resetChannel: (state) => {
            state.channel_id = null
            state.channel_name = null
        }
    }
})

export const { setChannelID, setChannelName, resetChannel } = appSlice.actions

export const select_channel_id = (state) => state.app.channel_id

export const select_channel_name = (state) => state.app.channel_name

export default appSlice.reducer