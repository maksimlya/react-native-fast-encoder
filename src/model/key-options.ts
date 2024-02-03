// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { Algorithm } from '../model/algorithm';
import { Cipher } from '../model/cipher';
import { Compression } from '../model/compression';
import { Curve } from '../model/curve';
import { Hash } from '../model/hash';


/**
 * KeyOptions collects a number of parameters along with sensible defaults.
 */
export class KeyOptions {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):KeyOptions {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsKeyOptions(bb:flatbuffers.ByteBuffer, obj?:KeyOptions):KeyOptions {
  return (obj || new KeyOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsKeyOptions(bb:flatbuffers.ByteBuffer, obj?:KeyOptions):KeyOptions {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new KeyOptions()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

/**
 * The public key algorithm to use - will always create a signing primary
 * key and encryption subkey.
 */
algorithm():Algorithm {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : Algorithm.RSA;
}

mutate_algorithm(value:Algorithm):boolean {
  const offset = this.bb!.__offset(this.bb_pos, 4);

  if (offset === 0) {
    return false;
  }

  this.bb!.writeInt32(this.bb_pos + offset, value);
  return true;
}

/**
 * Curve configures the desired packet.Curve if the Algorithm is PubKeyAlgoECDSA,
 * PubKeyAlgoEdDSA, or PubKeyAlgoECDH. If empty Curve25519 is used.
 */
curve():Curve {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : Curve.CURVE25519;
}

mutate_curve(value:Curve):boolean {
  const offset = this.bb!.__offset(this.bb_pos, 6);

  if (offset === 0) {
    return false;
  }

  this.bb!.writeInt32(this.bb_pos + offset, value);
  return true;
}

/**
 * Hash is the default hash function to be used.
 * If zero, SHA-256 is used.
 */
hash():Hash {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : Hash.SHA256;
}

mutate_hash(value:Hash):boolean {
  const offset = this.bb!.__offset(this.bb_pos, 8);

  if (offset === 0) {
    return false;
  }

  this.bb!.writeInt32(this.bb_pos + offset, value);
  return true;
}

/**
 * Cipher is the cipher to be used.
 * If zero, AES-128 is used.
 */
cipher():Cipher {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : Cipher.AES128;
}

mutate_cipher(value:Cipher):boolean {
  const offset = this.bb!.__offset(this.bb_pos, 10);

  if (offset === 0) {
    return false;
  }

  this.bb!.writeInt32(this.bb_pos + offset, value);
  return true;
}

/**
 * Compression is the compression algorithm to be
 * applied to the plaintext before encryption. If zero, no
 * compression is done.
 */
compression():Compression {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : Compression.NONE;
}

mutate_compression(value:Compression):boolean {
  const offset = this.bb!.__offset(this.bb_pos, 12);

  if (offset === 0) {
    return false;
  }

  this.bb!.writeInt32(this.bb_pos + offset, value);
  return true;
}

/**
 * CompressionLevel is the compression level to use. It must be set to
 * between -1 and 9, with -1 causing the compressor to use the
 * default compression level, 0 causing the compressor to use
 * no compression and 1 to 9 representing increasing (better,
 * slower) compression levels. If Level is less than -1 or
 * more then 9, a non-nil error will be returned during
 * encryption. See the constants above for convenient common
 * settings for Level.
 */
compressionLevel():number {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

mutate_compression_level(value:number):boolean {
  const offset = this.bb!.__offset(this.bb_pos, 14);

  if (offset === 0) {
    return false;
  }

  this.bb!.writeInt32(this.bb_pos + offset, value);
  return true;
}

/**
 * RSABits is the number of bits in new RSA keys made with NewEntity.
 * If zero, then 2048 bit keys are created.
 */
rsaBits():number {
  const offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

mutate_rsa_bits(value:number):boolean {
  const offset = this.bb!.__offset(this.bb_pos, 16);

  if (offset === 0) {
    return false;
  }

  this.bb!.writeInt32(this.bb_pos + offset, value);
  return true;
}

static startKeyOptions(builder:flatbuffers.Builder) {
  builder.startObject(7);
}

static addAlgorithm(builder:flatbuffers.Builder, algorithm:Algorithm) {
  builder.addFieldInt32(0, algorithm, Algorithm.RSA);
}

static addCurve(builder:flatbuffers.Builder, curve:Curve) {
  builder.addFieldInt32(1, curve, Curve.CURVE25519);
}

static addHash(builder:flatbuffers.Builder, hash:Hash) {
  builder.addFieldInt32(2, hash, Hash.SHA256);
}

static addCipher(builder:flatbuffers.Builder, cipher:Cipher) {
  builder.addFieldInt32(3, cipher, Cipher.AES128);
}

static addCompression(builder:flatbuffers.Builder, compression:Compression) {
  builder.addFieldInt32(4, compression, Compression.NONE);
}

static addCompressionLevel(builder:flatbuffers.Builder, compressionLevel:number) {
  builder.addFieldInt32(5, compressionLevel, 0);
}

static addRsaBits(builder:flatbuffers.Builder, rsaBits:number) {
  builder.addFieldInt32(6, rsaBits, 0);
}

static endKeyOptions(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createKeyOptions(builder:flatbuffers.Builder, algorithm:Algorithm, curve:Curve, hash:Hash, cipher:Cipher, compression:Compression, compressionLevel:number, rsaBits:number):flatbuffers.Offset {
  KeyOptions.startKeyOptions(builder);
  KeyOptions.addAlgorithm(builder, algorithm);
  KeyOptions.addCurve(builder, curve);
  KeyOptions.addHash(builder, hash);
  KeyOptions.addCipher(builder, cipher);
  KeyOptions.addCompression(builder, compression);
  KeyOptions.addCompressionLevel(builder, compressionLevel);
  KeyOptions.addRsaBits(builder, rsaBits);
  return KeyOptions.endKeyOptions(builder);
}
}