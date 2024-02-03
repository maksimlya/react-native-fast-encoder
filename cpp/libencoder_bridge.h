#include <stdint.h>
#include <stdlib.h>
typedef struct { void *data; int len; int cap; } BytesReturn;

#ifdef __cplusplus
extern "C" {
#endif
extern char* Encode(void* p0);
extern char* Decode(char* p0, void* p1, int p2);
#ifdef __cplusplus
}
#endif
