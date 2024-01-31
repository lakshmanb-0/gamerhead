'use server'
import { PrismaClient, usersDb } from "@prisma/client";

const prisma = new PrismaClient();

type userType = {
    id: string,
    name: string,
    email: string
}

// create User 
export const createUser = async ({ id, name, email }: userType) => {
    try {
        const currentUser = await prisma.usersDb.findFirst({
            where: {
                id: id, // Replace with the actual condition you want to use
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
        }
        const allUsers = await prisma.usersDb.findMany()
        return allUsers;

    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// current User 
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

        const allUsers = await prisma.usersDb.findMany()
        return allUsers;

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

        const allUsers = await prisma.usersDb.findMany()
        return allUsers;

    } catch (error) {
        console.error('Error Deleting id:', error);
    } finally {
        await prisma.$disconnect();
    }
}
// delete ALLcart 
export const deleteAllCart = async (userId: string) => {
    try {
        const currentUser = await prisma.usersDb.findFirst({
            where: {
                id: userId,
            },
        })

        const newCartData: usersDb = await prisma.usersDb.update({
            where: { id: userId },
            data: { cartData: [] },
        });

        return currentUser;

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
            data: { wishlistData: [...currentUser?.wishlistData!, id] },
        });

        const allUsers = await prisma.usersDb.findMany()
        return allUsers;

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

        const allUsers = await prisma.usersDb.findMany()
        return allUsers;

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
        const newLastVisited: usersDb = await prisma.usersDb.update({
            where: { id: userId },
            data: { lastVisitedData: [...currentUser?.lastVisitedData!, id] },
        });

        const allUsers = await prisma.usersDb.findMany()
        return allUsers;

    } catch (error) {
        console.error('Error creating id:', error);
    } finally {
        await prisma.$disconnect();
    }
}


// create purchased 
export const createPurchased = async (userId: string, id: number[]) => {
    try {
        const currentUser = await prisma.usersDb.findFirst({
            where: {
                id: userId,
            },
        })

        const newCartData: usersDb = await prisma.usersDb.update({
            where: { id: userId, },
            data: { purchasedData: id },
        });

        const allUsers = await prisma.usersDb.findMany()
        return allUsers;

    } catch (error) {
        console.error('Error creating id:', error);
    } finally {
        await prisma.$disconnect();
    }
}
