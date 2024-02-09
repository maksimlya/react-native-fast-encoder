# Implementation of Efficient Text Encoding Library in React Native

This library offers significantly faster text encoding functionality compared to the default `TextEncoder` available in React Native (with 'text-encoding' library)

**Key Features:**

* **Based on:** `react-native-fast-openpgp` for initial groundwork.
* **Leverages JSI:** Utilizes JSI (JavaScript Interface) to perform text encoding functions on the native side (Golang)
* **Encoding:** Only supports UTF-8 for now.

**Usage:**

```javascript
npm i react-native-fast-encoder
const TextEncoder = require('react-native-fast-encoder');
window.TextEncoder = TextEncoder;
window.TextDecoder = TextEncoder;
```


3. Now, you can use the standard `TextEncoder` and `TextDecoder` APIs for your text encoding/decoding operations, and the library will automatically utilize the efficient native implementations.

**Benchmark Results (React Native with Hermes engine):**

| Task                        | `text-encoding` (ms) | `react-native-fast-encoder` (ms) | Performance Improvement |
|------------------------------|--------------------|-----------------------|-------------------------|
| Encode 100kb string          | 220                | 3                      | 73x faster               |
| Encode 100 * 100kb strings   | 18,000             | 100                    | 180x faster             |
| Encode 10k small strings     | 210                | 50                      | 4.2x faster              |
| Decode 100kb string          | 180                | 1                      | 180x faster             |
| Decode 100 * 100kb strings   | 17,000             | 25                     | 680x faster             |
| Decode 10k small strings     | 160                | 45                      | 3.5x faster              |

**Performance Expectations:**

You can expect significant performance improvements (4x to 100x) compared to the 'text-encoding' library, especially when dealing with large strings. This gain results from utilizing the more efficient native implementations through JSI.

**Note:**

This information is based on the given data and might not represent the actual library's functionality or source code. Please refer to the actual library documentation for specific usage instructions and limitations.