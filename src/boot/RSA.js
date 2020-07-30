

import Vue from 'vue'

const publicKey =  "-----BEGIN rsa public key-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0s1y+nLTHbztmPJh+4TI/xvL3\nixkAkIms8b/Umme65vFVsojuP3/N2bgw7OXAFUZNMO13j8YZJ/na7TjVkHnuSYGe\nDy72V3RArVtAxC107AK8JDKfBBIxD3mXWn3E500K8FtVJQbr/Djj9cs4xM0YKBYc\naZ669fY/ztBOlYjf3QIDAQAB\n-----END rsa public key-----\n"

const RSA = {
  encrypt(text)  {
    var encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    return encrypt.encrypt(text)
  }
}

Vue.prototype.$rsa = RSA


