import React, {useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import IntentModule from './native/intent-module';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  row: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '50%',
    marginBottom: 20,
  },
  button: {
    width: '50%',
  },
});

function App(): JSX.Element {
  const [payload, setPayload] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function handleRegisterPress() {
    await IntentModule.makeIntent({payload}, operationCode => {
      Alert.alert('Result', operationCode.toString());
    });
  }
  async function handleTransactionPress() {
    await IntentModule.makeIntent(
      {transactionRequestId: transactionId},
      operationCode => {
        Alert.alert('Result', operationCode.toString());
      },
    );
  }

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={payload}
          onChangeText={setPayload}
        />
        <Button title="Register" onPress={handleRegisterPress} />
      </View>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={transactionId}
          onChangeText={setTransactionId}
        />
        <Button title="Transaction" onPress={handleTransactionPress} />
      </View>
    </SafeAreaView>
  );
}

export default App;
