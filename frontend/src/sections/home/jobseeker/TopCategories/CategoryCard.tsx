import { styled, Box, Typography } from '@mui/material';

type Props = {
  icon?: React.ReactNode;
  name?: string;
  url?: string;
};

const CategoryCardStyled = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  cursor: 'pointer',
  padding: '20px',
  borderRadius: '12px',
  backgroundColor: '#fff',
  '&:hover': {
    boxShadow: '4px 4px 16px 0 rgba(245, 34, 45,0.2)',
  },
});

const CategoryCard = ({ icon, name, url }: Props) => {
  return (
    <CategoryCardStyled>
      {icon}
      <Typography variant='h4'>{name}</Typography>
    </CategoryCardStyled>
  );
};

export default CategoryCard;
