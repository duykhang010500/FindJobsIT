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
