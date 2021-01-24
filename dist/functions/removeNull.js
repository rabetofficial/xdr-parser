"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(str) {
  var newStr = str.replace('\0', '');
  newStr = newStr.replace(/\0/g, '');
  return newStr;
};

exports["default"] = _default;