/**
 * @format
 * @flow
 */

import rsa from 'jsrsasign';

export const generate = (data, cb) => {
  const current = rsa.KJUR.jws.IntDate.get('now');
  const expireOneMinute = current + 5 * 60;

  const header = {alg: 'HS256', typ: 'JWT'};

  var payload = {
    nbf: current,
    exp: expireOneMinute,
    data,
  };

  const key = 'yt4re5';
  const signature = rsa.KJUR.jws.JWS.sign('HS256', JSON.stringify(header), JSON.stringify(payload), key);

  return cb(signature);
};

export const verify = (signature, cb) => {
  const isValid = rsa.KJUR.jws.JWS.verify(signature, 'yt4re5', ['HS256']);
  if (!isValid) {
    return cb(new Error('Signature is not valid'));
  }

  const header = rsa.KJUR.jws.JWS.readSafeJSONString(rsa.b64utoutf8(signature.split('.')[0]));
  const payload = rsa.jws.JWS.readSafeJSONString(rsa.b64utoutf8(signature.split('.')[1]));

  if (header.alg !== 'HS256' || header.typ !== 'JWT') {
    return cb(new Error('Signature is not valid'));
  }

  const current = rsa.KJUR.jws.IntDate.get('now');
  if (current < payload.nbf) {
    return cb(new Error('Signature is not before ' + payload.nbf));
  }
  if (current > payload.exp) {
    return cb(new Error('Signature is expired from ' + payload.exp));
  }

  return cb(null, payload.data);
};
