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

export const findIndexByName = (name: string, arr: any[]) => {
  let idx = arr.findIndex((item: any) => item?.name?.trim() === name?.trim());
  return idx;
};

export const findIndexByName1 = (name: string, arr: any[]) => {
  let idx = arr.findIndex((item: any) => item?.name === name);
  return idx;
};

export const getStatusOrder = (status: number) => {
  switch (status) {
    case 1:
      return 'Pending';
    case 2:
      return 'Precessed';
    case 3:
      return 'Rejected';
  }
};

export const convertArrStringToString = (arrStr: any) => {
  let str = '';

  arrStr.forEach((item: any, index: number) => {
    if (index === 0) {
      str += item;
    } else {
      str += `, ${item}`;
    }
  });

  return str;
};

export const convertJobStatus = (status: number) => {
  switch (status) {
    case 0: {
      return 'Draft';
    }
    case 1: {
      return 'Public';
    }
    case 2: {
      return 'Pending';
    }
    case 3: {
      return 'Closed';
    }
    case 4: {
      return 'Rejected';
    }
  }
};
