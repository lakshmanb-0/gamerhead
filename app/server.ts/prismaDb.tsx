'use server'
import { PrismaClient, usersDb } from "@prisma/client";

const prisma = new PrismaClient();

type userType = {
    id: string,
    name: string,
    email: string
}

// create new User 
export const createUser = async ({ id, name, email }: userType) => {
    try {
        const currentUser = await prisma.usersDb.findFirst({
            where: {
                id: id,
            },
        })

        if (!currentUser) {
            const newUser = await prisma.usersDb.create({
                data: {
                    id: id,
                    name: name,
                    email: email,
                    cartData: [],
                    wishlistData: [],
                    lastVisitedData: [],
                    purchasedData: [],
                },
            });
            return newUser
        }
        return currentUser;

    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// find current User 
export const currentUser = async (userId: string) => {
    try {
        const currentUser = await prisma.usersDb.findFirst({
            where: {
                id: userId, // Replace with the actual condition you want to use
            },
        })
        return currentUser;

    } catch (error) {
        console.error('Error getting user:', error);
    } finally {
        await prisma.$disconnect();
    }
}


// create cart 
export const createCart = async (userId: string, id: number) => {
    try {
        const currentUser = await prisma.usersDb.findFirst({
            where: {
                id: userId,
            },
        })

        const newCartData: usersDb = await prisma.usersDb.update({
            where: { id: userId, },
            data: { cartData: [...currentUser?.cartData!, id] },
        });

        return newCartData;

    } catch (error) {
        console.error('Error creating id:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// delete cart 
export const deleteCart = async (userId: string, id: number) => {
    try {
        const currentUser = await prisma.usersDb.findFirst({
            where: {
                id: userId,
            },
        })

        const newCartData: usersDb = await prisma.usersDb.update({
            where: { id: userId },
            data: { cartData: currentUser?.cartData.filter(el => el != id) },
        });

        return newCartData;

    } catch (error) {
        console.error('Error Deleting id:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// delete ALLcart 
export const deleteAllCart = async (userId: string) => {
    try {

        const newCartData: usersDb = await prisma.usersDb.update({
            where: { id: userId },
            data: { cartData: [] },
        });

        return newCartData;

    } catch (error) {
        console.error('Error Deleting id:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// create wishlist 
export const createWishlist = async (userId: string, id: number) => {
    try {
        const currentUser = await prisma.usersDb.findFirst({
            where: { id: userId }
        })
        const newLastVisited: usersDb = await prisma.usersDb.update({
            where: { id: userId },
            data: { wishlistData: [id, ...currentUser?.wishlistData!] },
        });

        return newLastVisited;

    } catch (error) {
        console.error('Error creating id:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// delete wishlist 
export const deleteWishlist = async (userId: string, id: number) => {
    try {
        const currentUser = await prisma.usersDb.findFirst({
            where: { id: userId }
        })
        const newWishlistData: usersDb = await prisma.usersDb.update({
            where: { id: userId },
            data: { wishlistData: currentUser?.wishlistData.filter(el => el != id) },
        });

        return newWishlistData;

    } catch (error) {
        console.error('Error Deleting id:', error);
    } finally {
        await prisma.$disconnect();
    }
}


// create last visited  
export const createLastVisited = async (userId: string, id: number) => {
    try {
        const currentUser = await prisma.usersDb.findFirst({
            where: { id: userId }
        })
        let only10Items = currentUser?.lastVisitedData?.slice(0, 10);
        const newLastVisited: usersDb = await prisma.usersDb.update({
            where: { id: userId },
            data: { lastVisitedData: [id, ...only10Items!] },
        });

        return newLastVisited;

    } catch (error) {
        console.error('Error creating id:', error);
    } finally {
        await prisma.$disconnect();
    }
}


// create purchased 
export const createPurchased = async (userId: string, id: number[]) => {
    try {
        const newCartData: usersDb = await prisma.usersDb.update({
            where: { id: userId, },
            data: { purchasedData: id },
        });

        return newCartData;

    } catch (error) {
        console.error('Error creating id:', error);
    } finally {
        await prisma.$disconnect();
    }
}
