import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject(state,{ purchased : false });
};

const purchaseStart = (state,action) => {
    return updateObject(state,{ loading : true });
}

const purchaseSuccess = (state,action) => {
    const newOrder = updateObject(action.OrderData, {
        id : action.orderId
    });
    return updateObject(state,{
        loading: false,
        purchased: true,
        orders : state.orders.concat(newOrder)
    });
}

const purchaseFailure = (state,action) => {
    return updateObject(state,{ loading : false });
}

const fetchStart = (state,action) => {
    return updateObject(state, { loading : true });
}

const fetchSuccess = (state,action) => {
    return updateObject({
        orders: action.orders,
        loading: false
    });
}

const fetchFail = (state,action) => {
    return updateObject(state,{
        loading: false
    });
}

const reducer = (state = initialState,action) => {
    switch(action.type) { 
        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state,action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state,action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFailure(state,action);
        case actionTypes.FETCH_ORDERS_START: return fetchStart(state,action);
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchSuccess(state,action);
        case actionTypes.FETCH_ORDER_FAIL: return fetchFail(state,action);
        default: return state;
    }
};

export default reducer;