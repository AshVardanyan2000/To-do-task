// import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
// export type RootState = ReturnType<typeof reducers>
//
//
// export default configureStore({
//     reducer: reducers,
//     devTools: true,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
// });


import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})
export type RootState = ReturnType<typeof store.getState>

export default store
