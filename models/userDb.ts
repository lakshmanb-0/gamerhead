import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cartData: {
        type: Array,
        default: []
    },
    wishlistData: {
        type: Array,
        default: [],
    },
    lastVisitedData: {
        type: Array,
        default: [],
    },
    purchasedData: {
        type: Array,
        default: [],
    },
})

const userDb = models.usersDb || model('usersDb', userSchema);
export default userDb