import {NativeModules} from 'react-native';

const {IntentModule} = NativeModules;

interface IIntentModule {
  /**
   * @param extras - map of additional data sent to the partner app.
   * It may be base64 payload or transaction request ID.
   * possible keys for now are "payload" and "transactionRequestId".
   * @example { payload: "some_base64_string" }
   * @example { transactionRequestId: "some_big_id" }
   *
   * @param callback - a callback which is invoked when response is received.
   * It accepts integer number, usually 200 (success - application registered, transaction successful)
   * or 500 (error - something bas has happened).
   * It is up to you how to handle those codes.
   */
  makeIntent(
    extras: {[key: string]: string},
    callback: (errorCode: number) => void,
  ): Promise<void>;
  /**
   * @description Checks whether partner app is installed.
   * if so - you will receive response 200 in provided callback. If not - 500.
   * Callback is actually the same function as in method above.
   */
  isAppInstalled(
    callback: (isInstalled: boolean) => Promise<void>,
  ): Promise<number>;
}

export default IntentModule as IIntentModule;
