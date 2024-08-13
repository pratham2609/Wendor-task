import NodeCache from "node-cache";

const verificationCodeCache = new NodeCache({ stdTTL: 300 }); // TTL of 5 minutes

export const setVerificationCode = (userId: string, code: number) => {
    verificationCodeCache.set(userId, code);
};

export const getVerificationCode = (userId: string) => {
    return verificationCodeCache.get(userId);
};

export const deleteVerificationCode = (userId: string) => {
    verificationCodeCache.del(userId);
};

const homePageCache = new NodeCache({ stdTTL: 600 }); // Cache TTL set to 10 minutes

export const getHomePageCache = (key: string) => {
    return homePageCache.get(key);
};

export const setHomePageCache = (key: string, value: string) => {
    homePageCache.set(key, value);
};

export const deleteHomePageCache = (key: string) => {
    homePageCache.del(key);
};