import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
type Props = {};

const JobRequirement = (props: Props) => {
  return (
    <Card>
      <CardHeader title={`Requirement`} />
      <CardContent>
        <p>Lorem ipsum dolor sit amet.</p>
      </CardContent>
    </Card>
  );
};

export default JobRequirement;
