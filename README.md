Implementation of the lib is completely based on react-native-fast-openpgp as initial example.

This library uses JSI to perform Text Encoding functions on native side.

> const TextEncoder = require('react-native-fast-encoder);
window.TextEncoder = TextEncoder;
window.TextDecoder = TextDecoder;

***Benchmark***
*All tests made on react-native with hermes engine.

**Encode 100kb string:**
'text-encoding' - 220 ms
'react-native-fast-encoder' - 3ms

**Encode 100 * 100kb strings:**
'text-encoding' - 18 sec
'react-native-fast-encoder' - 100 ms

**Encode 10k small strings:**
'text-encoding' - 210 ms
'react-native-fast-encoder' - 50 ms

**Decode 100kb string:**
'text-encoding' - 180 ms
'react-native-fast-encoder' - 1ms

**Decode 100 * 100kb strings:**
'text-encoding' - 17 sec
'react-native-fast-encoder' - 25ms

**Decode 10k small strings:**
'text-encoding' - 160 ms
'react-native-fast-encoder' - 45ms

Expect anywhere between 4-100x times performance since current implementation of TextEncoder in react-native is very inefficient(0.73.3).
Biggest impact on large strings.
