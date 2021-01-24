"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonXdr = require("json-xdr");

var _stellarSdk = _interopRequireDefault(require("stellar-sdk"));

var _memo = _interopRequireDefault(require("./functions/memo"));

var _ed = _interopRequireDefault(require("./functions/ed25519"));

var _operations = _interopRequireDefault(require("./functions/operations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(xdr) {
  var object = (0, _jsonXdr.toJSON)(_stellarSdk["default"].xdr.TransactionEnvelope.fromXDR(xdr, 'base64'));
  var parsed = {};
  var tx;

  if (object.v0) {
    tx = object.v0.tx;
  } else if (object.v1) {
    tx = object.v1.tx;
  } else {
    return {};
  }

  if (tx.fee) {
    parsed.fee = tx.fee;
  }

  if (tx.seqNum) {
    parsed.seqNum = tx.seqNum;
  }

  if (tx.memo) {
    parsed.memo = (0, _memo["default"])(tx.memo);
  }

  if (tx.timeBounds) {
    parsed.timeBounds = tx.timeBounds;
  }

  if (tx.sourceAccount) {
    parsed.sourceAccount = (0, _ed["default"])(tx.sourceAccount);
  }

  if (tx.operations) {
    parsed.operations = (0, _operations["default"])(tx.operations);
  }

  return parsed;
};

exports["default"] = _default;