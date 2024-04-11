#ifndef FASTENCODER_H
#define FASTENCODER_H

#include <jsi/jsilib.h>
#include <jsi/jsi.h>

using namespace facebook;

namespace fastEncoder {
    void install(facebook::jsi::Runtime &jsiRuntime);

    void cleanup();

    jsi::Value call(jsi::Runtime &runtime, const jsi::String &nameValue,
                            const jsi::Object &payloadValue,
                            const int index,
                            const bool stream);
    jsi::Value call(jsi::Runtime &runtime, const jsi::String &nameValue,
                            const jsi::Object &payloadValue);
}

#endif /* FASTENCODER_H */
