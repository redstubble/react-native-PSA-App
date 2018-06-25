import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Agreements from '../layout/Documents';
import Agreement from '../layout/Document';
export default (DrawNav = createStackNavigator(
  {
    Agreements: { screen: Agreements },
    Agreement: { screen: Agreement },
  },
  {
    initialRouteName: 'Agreements',
    headerMode: 'none',
  },
));
