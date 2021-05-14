/**
 * @format
 */
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native';
import App from './src';
import { watermelonDBinit } from './src/shared/infra/database'
import { name as appName } from './app.json';

watermelonDBinit()

AppRegistry.registerComponent(appName, () => App);
