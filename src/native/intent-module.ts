import {NativeModules} from 'react-native';

const {IntentModule} = NativeModules;

interface IIntentModule {
  makeIntent(
    extras: {[key: string]: string},
    callback: (errorCode: number) => void,
  ): Promise<void>;
  isAppInstalled(
    callback: (isInstalled: boolean) => Promise<void>,
  ): Promise<number>;
}

export default IntentModule as IIntentModule;
