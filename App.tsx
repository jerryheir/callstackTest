import React from 'react';
import {
  YellowBox
} from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/Store";
import Routes from './src/Navigation/Routes';

YellowBox.ignoreWarnings([
  "Remote"
]);

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
