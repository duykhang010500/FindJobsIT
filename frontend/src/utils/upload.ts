export const uploadSingleFile = async (file: any) => {
  const formData = new FormData();

  formData.append('file', file);

  formData.append('upload_preset', 'gmbxs39q');

  const res = await fetch('https://api.cloudinary.com/v1_1/dzbloxcjn/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  return data.secure_url;
};

export const uploadMultipleFile = async (files: any) => {
  let imgArr = [];
  for (const item of files) {
    const formData = new FormData();

    formData.append('file', item);

    formData.append('upload_preset', 'gmbxs39q');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dzbloxcjn/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();
    imgArr.push(data.secure_url);
  }
  return imgArr;
};
