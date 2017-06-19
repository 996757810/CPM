/**
 * Created by cjy on 16/11/23.
 */
import {NavigationActions} from 'react-navigation';

//redux相关工具函数集

export const createReducer = (initialState, handlers) => (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
    } else {
        return state;
    }
};

export const mergeAction = (...actions) => actions.map(s => s.toUpperCase()).join('_');

export const createActionCreator = pre => action => ({
    ...action,
    type: mergeAction(pre, action.type)
});

export const createApiActions = (keyword, type) => ({
    request: mergeAction(type, keyword, 'REQUEST'),
    success: mergeAction(type, keyword, 'SUCCESS'),
    error: mergeAction(type, keyword, 'ERROR'),
});

export const navigateAction = (routeName) => dispatch => dispatch(NavigationActions.navigate({routeName}));

export default {
    createReducer,
    createActionCreator,
    createApiActions,
    mergeAction,
    navigateAction,
}