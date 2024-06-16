'use server'
import userDb from "@/models/userDb";

type userType = {
    id: string,
    name: string | null,
    email: string
}

// create new User 
export const createUser = async ({ id, name, email }: userType) => {
    try {
        const isExistingUser = await userDb.findOne({ id: id })
        if (isExistingUser) return isExistingUser
        const newUser = await userDb.create({
            id: id,
            name: name,
            email: email,
        });
        return newUser

    } catch (error) {
        console.error('Error creating user:', error);
    }
}


// create cart 
export const createCart = async (userId: string, data: any) => {
    try {
        const currentUser = await userDb.find({ id: userId });
        if (!currentUser) {
            throw new Error('User not found');
        }
        const cart = await userDb.findByIdAndUpdate(currentUser[0]._id, { cartData: [data, ...currentUser[0].cartData] }, { new: true });

        return cart;

    } catch (error) {
        console.error('Error creating id:', error);
    }
}

// delete cart 
export const deleteCart = async (userId: string, id: number) => {
    try {
        const currentUser = await userDb.find({ id: userId });
        if (!currentUser) {
            throw new Error('User not found');
        }
        const cart = await userDb.findByIdAndUpdate(currentUser[0]._id, { cartData: [...currentUser[0].cartData.filter((item: any) => item.steam_appid !== id)] }, { new: true });

        return cart;


    } catch (error) {
        console.error('Error Deleting id:', error);
    }
}

// delete ALLcart 
export const deleteAllCart = async (userId: string) => {
    try {

        const currentUser = await userDb.find({ id: userId });
        if (!currentUser) {
            throw new Error('User not found');
        }
        const cart = await userDb.findByIdAndUpdate(currentUser[0]._id, { cartData: [] }, { new: true });

        return cart;

    } catch (error) {
        console.error('Error Deleting id:', error);
    }
}

// create wishlist 
export const createWishlist = async (userId: string, data: any) => {
    try {
        const currentUser = await userDb.find({ id: userId });
        if (!currentUser) {
            throw new Error('User not found');
        }
        const wishlist = await userDb.findByIdAndUpdate(currentUser[0]._id, { wishlistData: [data, ...currentUser[0].wishlistData] }, { new: true });

        return wishlist;

    } catch (error) {
        console.error('Error creating id:', error);
    }
}

// delete wishlist 
export const deleteWishlist = async (userId: string, steam_appid: number) => {
    try {
        const currentUser = await userDb.find({ id: userId });
        const wishlist = await userDb.findByIdAndUpdate(currentUser[0]._id, { wishlistData: [...currentUser[0].wishlistData.filter((el: any) => el.steam_appid != steam_appid)] }, { new: true });

        return wishlist;

    } catch (error) {
        console.error('Error Deleting id:', error);
    }
}

// create purchased 
export const createPurchased = async (userId: string) => {
    try {
        const currentUser = await userDb.find({ id: userId });
        if (!currentUser) {
            throw new Error('User not found');
        }
        const newCartData = await userDb.findByIdAndUpdate(currentUser[0]._id, { purchasedData: currentUser[0].cartData }, { new: true });

        return newCartData;

    } catch (error) {
        console.error('Error creating id:', error);
    }
}