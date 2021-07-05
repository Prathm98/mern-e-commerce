import { CART_ADD_ITEMS } from "../actions/constants";


export const cartReducer = (state={cartItems: []}, action) => {
    switch (action.type) {
        case CART_ADD_ITEMS:                        
            const item = action.payload
            const existed = state.cartItems.find(x => x.id === item.id)

            if(existed){
                return {...state, cartItems: state.cartItems.map(x => x.id === item.id? item: x)}
            }else{
                return { ...state, cartItems: [...state.cartItems, item]}
            }
        default:
            return state
    }
}