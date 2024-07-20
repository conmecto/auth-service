const getRandomKey = (size: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=#@&*';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter++ < size) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const capitalize = (text: string) => {
    return text.split(' ').map(t => t.substring(0, 1).toUpperCase() + t.substring(1).toLowerCase()).join(' ');
}

const formatDbQueryKey = (key: string) => {
    const keyWithoutUnderScore = key.split('_').map(c => c[0].toUpperCase() + c.substring(1)).join('');
    return keyWithoutUnderScore[0].toLowerCase() + keyWithoutUnderScore.substring(1);
}

function formatDbQueryResponse<T extends Object>(dbQueryResponse: Record<string, any>) {
    const formatedResponse: T = {} as T;
    for(let key of Object.keys(dbQueryResponse)) {
        const formatedKey = formatDbQueryKey(key); 
        formatedResponse[formatedKey] = dbQueryResponse[key];
    }
    return formatedResponse;
}

export { getRandomKey, capitalize, formatDbQueryResponse, formatDbQueryKey }