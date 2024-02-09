#include <stdint.h>
#include <stdlib.h>
typedef struct { void *message; int size; char* error; } GoResponse;

#ifdef __cplusplus
extern "C" {
#endif
extern GoResponse* Encode(char* p0);
extern char* Decode(uint8_t* p0, int length);
#ifdef __cplusplus
}
#endif
