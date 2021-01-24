"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(amount) {
  var toNumber = Number.parseFloat(amount, 10);
  var realNumber = toNumber / 10000000;
  var toStr = realNumber.toString();
  return toStr;
};

exports["default"] = _default;