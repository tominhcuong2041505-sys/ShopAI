import 'react-native-reanimated'; // Must be the first import
import {AppRegistry} from 'react-native';
import App from './App';
import './global.css';

const appName = 'ShopeeCloneUI';

AppRegistry.registerComponent(appName, () => App);

if (typeof document !== 'undefined') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  if (rootTag) {
    AppRegistry.runApplication(appName, {
      initialProps: {},
      rootTag,
    });
  }x
}