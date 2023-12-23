const getId = (size = 21): string => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const id = [];
    const max = Math.min(alphabet.length, 256);

    while (size--) {
        const random = (Math.random() * 256) | 0;
        id.push(alphabet.charAt(random % max));
    }

    return id.join('');
};

export default getId;
