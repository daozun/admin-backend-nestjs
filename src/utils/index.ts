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

export const listToTree = (items: any[], id = null, link = 'parent_id') =>
  items
  .filter(item => item[link] === id)
  .map((item: { id: any; }) => ({
    ...item,
    children: listToTree(items, item.id)
  }));