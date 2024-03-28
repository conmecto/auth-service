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

export { getRandomKey, capitalize }