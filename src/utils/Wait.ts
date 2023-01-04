export const wait = (timeout): Promise<any> => new Promise((resolve) => setTimeout(resolve, timeout));
