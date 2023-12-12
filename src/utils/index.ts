import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const encrypt = async (textToEncrypt: string) => {
    const hash = await bcrypt.hash(textToEncrypt, saltOrRounds);

    return hash;
};

export const isMatch = async (password: string, encryptedText: string) => {
    const isMatch =  await bcrypt.compare(password, encryptedText);

    return isMatch;
};

export const buildTree = (data: any[]) => {
    const tree = [];
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const parentId = item.parent_id;
        if (parentId) {
            const parent = tree.find((p) => p.id === parentId);
            if (parent) {
                parent.children = [...(parent.children || []), item];
            }
        } else {
            tree.push(item);
        }
    }

    return tree;
}