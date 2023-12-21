// uniqueArray 
export const getUniqueData = (objects: any) => {
    const uniqueMap = new Map();
    objects?.forEach((obj: any) => {
        uniqueMap.set(obj.id, obj);
    });
    return Array.from(uniqueMap.values());
};
