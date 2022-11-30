import React from 'react';

type Props = {};

const DetailCompanyCoverPicture = (props: Props) => {
  return (
    <div
      style={{
        backgroundImage: `url(https://hr1tech.com/htdocs/images/owners/hr1tech/banner/202211/banner-bg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '400px',
      }}
    ></div>
  );
};

export default DetailCompanyCoverPicture;
