"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stellarSdk = _interopRequireDefault(require("stellar-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(ed25519) {
  var keypair = new _stellarSdk["default"].Keypair({
    type: 'ed25519',
    publicKey: Buffer.from(ed25519, 'base64')
  });
  return keypair.publicKey();
};

exports["default"] = _default;