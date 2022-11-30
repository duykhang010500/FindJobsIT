import { styled, Box, Typography } from '@mui/material';

type Props = {};

const CategoryCardStyled = styled(Box)({
  padding: '20px',
});

const CategoryCard = (props: Props) => {
  return <CategoryCardStyled></CategoryCardStyled>;
};

export default CategoryCard;
