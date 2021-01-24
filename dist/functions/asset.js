"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stellarSdk = _interopRequireDefault(require("stellar-sdk"));

var _removeNull = _interopRequireDefault(require("./removeNull"));

var _ed = _interopRequireDefault(require("./ed25519"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(asset) {
  if (asset._type === 'assetTypeNative') {
    return {
      type: 'native'
    };
  }

  if (asset._type === 'assetTypeCreditAlphanum4') {
    if (asset.assetCode4) {
      var assetCode = (0, _removeNull["default"])(_stellarSdk["default"].xdr.AssetCode4.fromXDR(asset.assetCode4, 'base64').toString());
      return {
        type: 'credit_alphanum4',
        assetCode: assetCode
      };
    } else if (asset.alphaNum4) {
      var _assetCode, issuer;

      if (asset.alphaNum4.assetCode) {
        _assetCode = (0, _removeNull["default"])(_stellarSdk["default"].xdr.AssetCode4.fromXDR(asset.alphaNum4.assetCode, 'base64').toString());
      }

      if (asset.alphaNum4.issuer) {
        issuer = (0, _ed["default"])(asset.alphaNum4.issuer);
      }

      return {
        type: 'credit_alphanum4',
        assetCode: _assetCode,
        issuer: issuer
      };
    } else {
      return {
        type: 'credit_alphanum4'
      };
    }
  } else if (asset._type === 'assetTypeCreditAlphanum12') {
    if (asset.assetCode12) {
      var _assetCode2 = (0, _removeNull["default"])(_stellarSdk["default"].xdr.AssetCode12.fromXDR(asset.assetCode12, 'base64').toString());

      return {
        type: 'credit_alphanum12',
        assetCode: _assetCode2
      };
    } else if (asset.alphaNum12) {
      var _assetCode3, _issuer;

      if (asset.alphaNum12.assetCode) {
        _assetCode3 = (0, _removeNull["default"])(_stellarSdk["default"].xdr.AssetCode12.fromXDR(asset.alphaNum12.assetCode, 'base64').toString());
      }

      if (asset.alphaNum12.issuer) {
        _issuer = (0, _ed["default"])(asset.alphaNum12.issuer);
      }

      return {
        type: 'credit_alphanum12',
        assetCode: _assetCode3,
        issuer: _issuer
      };
    } else {
      return {
        type: 'credit_alphanum12'
      };
    }
  } else {
    return {
      type: 'unknown'
    };
  }
};

exports["default"] = _default;