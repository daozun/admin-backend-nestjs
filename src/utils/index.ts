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

export const sortByPriority = (treeList: { priority?: number; children?: any; }[]) => {
  treeList.sort((a: { priority: number; }, b: { priority: number; }) => a.priority - b.priority);
  if (treeList.some((node: { children: any; }) => node.children)) {
    treeList.forEach((node: { children: any; }) => {
      if (node.children) {
        sortByPriority(node.children);
      }
    });
  }
  return treeList;
}

export const findTreeIds = (treeList: any[]) => {
  let idList = [];

  for (const item of treeList) {
    if(item.children && item.children.length > 0) {
      idList.push(item.id);
      idList.concat(findTreeIds(item.children));
    } else {
      idList.push(item.id);
    }
  }

  return idList;
}

export const compareTrees = (newTree: any[], oldTree: any[]) => {
  
}