import { StoreData } from "../reducers/auth.reducers";

export const InitialStore = {
    currentUser: {
        id: '',
        _id: '',
        name: '',
        email: '',
        cartData: [] as StoreData[],
        wishlistData: [] as StoreData[],
        purchasedData: [] as StoreData[],
        lastVisitedData: [] as StoreData[],
    }

}