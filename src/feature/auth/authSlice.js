import {createSlice} from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        "accessToken": "",
        "isDev": "false"
    },
    reducers: {
        checkDevMode: (state, action) => {
            // 토큰 존재여부와 devMode가 true 인지 확인한다.
            if (process.env.REACT_APP_DEV_MODE === 'true' && process.env.REACT_APP_TEST_JWT_TOKEN)
            {
                state.accessToken = process.env.REACT_APP_TEST_JWT_TOKEN;
                state.isDev = process.env.REACT_APP_DEV_MODE

                sessionStorage.setItem("accessToken",state.accessToken);
            }
            // TODO: jwt 토큰 발급 로직 추후 예정
        }

    }
})

export const { checkDevMode } = authSlice.actions;