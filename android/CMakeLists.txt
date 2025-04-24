cmake_minimum_required(VERSION 3.9.0)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 20)
set (BUILD_DIR ${CMAKE_SOURCE_DIR}/build)

add_library(encoder_bridge SHARED IMPORTED)


find_package(ReactAndroid REQUIRED CONFIG)
find_package(fbjni REQUIRED CONFIG)


set_target_properties(encoder_bridge
        PROPERTIES
        IMPORTED_LOCATION ${CMAKE_SOURCE_DIR}/src/main/jniLibs/${ANDROID_ABI}/libencoder_bridge.so
        )

add_library(fast-encoder
        SHARED
        ../cpp/react-native-fast-encoder.cpp
        ../cpp/react-native-fast-encoder.h
        fast-encoder-adapter.cpp
)

include_directories(
        fast-encoder
        PRIVATE
        ../cpp
)

target_link_libraries(fast-encoder
        encoder_bridge
        fbjni::fbjni
        ReactAndroid::jsi
        ReactAndroid::turbomodulejsijni
        ReactAndroid::react_nativemodule_core
        android
        log)