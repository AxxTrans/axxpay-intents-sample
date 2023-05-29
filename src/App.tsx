import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import IntentModule from './native/intent-module';
import {Button} from './button';

const golden = '#e5c984';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: golden,
  },
  row: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    borderBottomWidth: 2,
    width: '50%',
    marginBottom: 20,
    fontSize: 20,
    color: 'black',
  },
  button: {
    width: '50%',
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  responseRow: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: 40,
    marginTop: 20,
  },
  mLeft: {
    marginLeft: 10,
  },
});

function App(): JSX.Element {
  const [payload, setPayload] = useState('');
  const [registrationCode, setRegistrationCode] = useState<number>();
  const [transactionCode, setTransactionCode] = useState<number>();
  const [transactionId, setTransactionId] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function handleRegisterPress() {
    await IntentModule.makeIntent({payload}, operationCode => {
      setRegistrationCode(operationCode);
    });
  }
  async function handleTransactionPress() {
    await IntentModule.makeIntent(
      {transactionRequestId: transactionId},
      operationCode => {
        setTransactionCode(operationCode);
      },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.row}>
        <Text style={styles.text}>
          {'Step 6. Send intent to the AxxPayNFC app with "payload"'}
        </Text>
        <TextInput
          style={styles.input}
          value={payload}
          onChangeText={setPayload}
        />
        <Button
          title="Register"
          onPress={handleRegisterPress}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <View style={styles.responseRow}>
          <Text style={styles.text}>Response:</Text>
          <Text
            style={[
              styles.text,
              styles.mLeft,
              registrationCode === 200 ? {color: 'green'} : {color: 'red'},
            ]}>
            {registrationCode ? registrationCode : ''}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>
          {'Step 9. Send intent to the AxxPayNFC app with "transaction code"'}
        </Text>
        <TextInput
          style={styles.input}
          value={transactionId}
          onChangeText={setTransactionId}
        />
        <Button
          title="Transaction"
          onPress={handleTransactionPress}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <View style={styles.responseRow}>
          <Text style={styles.text}>Response:</Text>
          <Text
            style={[
              styles.text,
              styles.mLeft,
              transactionCode === 200 ? {color: 'green'} : {color: 'red'},
            ]}>
            {transactionCode ? transactionCode : ''}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
