/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import TextEncoder from 'react-native-fast-encoder';
import TE from 'text-encoding';
import React from 'react';
import type {PropsWithChildren} from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
} from 'react-native';

window.encoder = new TE.TextEncoder();
window.decoder = new TE.TextDecoder('utf-8');
window.fastEncoder = new TextEncoder();


import {testVal, intArr, mb8 as mb4, windows1255Encoded} from './data';
window.testVal = testVal;
window.intArr = intArr;


function testEncode() {
  const startTime = Date.now();
  window.encoded = window.encoder.encode(testVal);
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}



function testEncode100() {
  const startTime = Date.now()
  for(let i = 0 ; i < 100 ; i ++) {
    window.encoded = window.encoder.encode(testVal);
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}

function testEncodeSmall10k() {
  const startTime = Date.now()
  for(let i = 0 ; i < 10000 ; i ++) {
    window.encoder.encode('Mommy here');
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}


function testFastEncode() {
  const startTime = Date.now();
  window.encoded = fastEncoder.encode(testVal);
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}

function testFastEncode100() {
  const startTime = Date.now();
  for(let i = 0 ; i < 100 ; i ++) {
    window.encoded = fastEncoder.encode(testVal);
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}

function testFastEncodeSmall10k() {
  const startTime = Date.now();
  for(let i = 0 ; i < 10000 ; i ++) {
    fastEncoder.encode('Mommy here');
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}

function testDecode1255() {
  const startTime = Date.now();
  const win1255Decoder = new TE.TextDecoder('windows-1255');
  window.win1255Decoded = win1255Decoder.decode(new Uint8Array(windows1255Encoded));
  console.error("decode executionTime = " + (Date.now() - startTime));
}

function test10Decode1255() {
  const startTime = Date.now();
  for (let n = 0; n < 10; n++) {
    const win1255Decoder = new TE.TextDecoder('windows-1255');
    window.win1255Decoded  = win1255Decoder.decode(new Uint8Array(windows1255Encoded));
  }
  console.error("decode executionTime = " + (Date.now() - startTime));
}

function testDecode() {
  const startTime = Date.now();
  window.decoder.decode(window.encoded);
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}
function testDecode100() {
  const startTime = Date.now();
  for(let i = 0 ; i < 100 ; i ++) {
    window.decoder.decode(window.encoded);
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}
function testDecodeSmall10k() {
  const startTime = Date.now();
  for(let i = 0 ; i < 10000 ; i ++) {
    window.decoder.decode(new Uint8Array([1,2,3,4,5]));
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}
function testFastDecode1255() {
  const startTime = Date.now();
  const win1255Decoder = new TextEncoder('windows-1255');
  window.win1255Decoded = win1255Decoder.decode(new Uint8Array(windows1255Encoded));
  console.error("decode executionTime = " + (Date.now() - startTime));
}

function testFast100Decode1255() {
  const startTime = Date.now();
  for (let n = 0; n < 100; n++) {
    const win1255Decoder = new TextEncoder('windows-1255');
    window.win1255Decoded  = win1255Decoder.decode(new Uint8Array(windows1255Encoded));
  }
  console.error("decode executionTime = " + (Date.now() - startTime));
}
function testFastDecode() {
  const startTime = Date.now();
  new TextEncoder().decode(window.encoded);
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}
function testFastDecode100() {
  const startTime = Date.now();
  for(let i = 0 ; i < 100 ; i ++) {
    new TextEncoder().decode(window.encoded);
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}
function testFastDecodeSmall10k() {
  const startTime = Date.now();
  for(let i = 0 ; i < 10000 ; i ++) {
    new TextEncoder().decode(new Uint8Array([1,2,3,4,5]));
  }
  const execTime = "ExecutionTime = " + (Date.now() - startTime);
  Alert.alert('alert',execTime);
}


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
          <Button title="Test Encode" onPress={() => {
            testEncode()
          }}></Button>
            <Button title="Test Encode 100" onPress={() => {
              testEncode100()
          }}></Button>
          <Button title="Test Encode 10k small strings" onPress={() => {
              testEncodeSmall10k()
          }}></Button>
          <Button title="Test Decode " onPress={() => {
              testDecode()
          }}></Button>
              <Button title="Test Decode 100 " onPress={() => {
              testDecode100()
          }}></Button>
          <Button title="Test Decode 10k small strings" onPress={() => {
              testDecodeSmall10k()
          }}></Button>
           <Button title="Test Decode 1255" onPress={() => {
              testDecode1255()
          }}></Button>
          <Button title="Test Decode 10 1255" onPress={() => {
              test10Decode1255()
          }}></Button>

          <View style={{ height: 40 }} />

          <Button title="Test Fast Encode" onPress={() => {
              testFastEncode()
          }}></Button>
          <Button title="Test Fast Encode 100" onPress={() => {
              testFastEncode100()
          }}></Button>
          <Button title="Test Fast Encode 10k small strings" onPress={() => {
              testFastEncodeSmall10k()
          }}></Button>
         <Button title="Test Fast Decode " onPress={() => {
            testFastDecode()
        }}></Button>
        <Button title="Test Fast Decode 100" onPress={() => {
            testFastDecode100()
        }}></Button>
        <Button title="Test Fast Decode 10k small strings" onPress={() => {
            testFastDecodeSmall10k()
        }}></Button>
        <Button title="Test Fast Decode 1255" onPress={() => {
              testFastDecode1255()
          }}></Button>
          <Button title="Test Fast Decode 100 1255" onPress={() => {
              testFast100Decode1255()
          }}></Button>
          {/* <Button title="Test Convert " onPress={() => {
            testConvert()
        }}></Button> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
