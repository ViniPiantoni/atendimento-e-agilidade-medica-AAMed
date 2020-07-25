import React from 'react';

import { Button, Label } from './styles';

export const MainButton = ({ onPress, label, children, flag }) => {
  return (
    <Button onPress={onPress}>
      {flag ? children : <Label>{label}</Label>}
    </Button>
  );
};
