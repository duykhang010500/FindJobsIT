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

export const getDefaultMultiple = (ids: any, arr: any[]) => {
  let newArr: any[] = [];
  const idArr = ids.split(',');
  arr.forEach((item) => {
    idArr.forEach((id: any) => {
      if (item.id === +id) {
        newArr.push(item);
      }
    });
  });
  return newArr;
};
