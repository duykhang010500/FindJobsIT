export const getStrFromArr = (arr: any) => {
  let str = ' ';
  arr.forEach((item: any, index: number) => {
    if (index === 0) {
      str += `${item.name.trim()}`;
    } else {
      str += `, ${item.name.trim()}`;
    }
  });
  return str;
};

export const getIdFromArr = (arr: any) => {
  let str = '';
  arr.forEach((item: any, index: number) => {
    if (index === 0) {
      str += `${item.id}`;
    } else {
      str += `,${item.id}`;
    }
  });
  return str;
};
