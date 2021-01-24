"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _removeNull = _interopRequireDefault(require("./removeNull"));

var _asset = _interopRequireDefault(require("./asset"));

var _amount = _interopRequireDefault(require("./amount"));

var _ed = _interopRequireDefault(require("./ed25519"));

var operationNames = _interopRequireWildcard(require("../static/operations"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = function _default(operations) {
  var newOperations = [];

  var _iterator = _createForOfIteratorHelper(operations),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var operation = _step.value;
      var body = operation.body;

      if (body._type === operationNames.payment) {
        newOperations.push({
          type: body._type,
          asset: (0, _asset["default"])(body.paymentOp.asset),
          amount: (0, _amount["default"])(body.paymentOp.amount),
          destination: (0, _ed["default"])(body.paymentOp.destination)
        });
      } else if (body._type === operationNames.createAccount) {
        newOperations.push({
          type: body._type,
          destination: (0, _ed["default"])(body.createAccountOp.destination),
          startingBalance: (0, _amount["default"])(body.createAccountOp.startingBalance)
        });
      } else if (body._type === operationNames.pathPaymentStrictReceive) {
        var params = {
          type: body._type,
          sendAsset: (0, _asset["default"])(body.pathPaymentStrictReceiveOp.sendAsset),
          sendMax: (0, _amount["default"])(body.pathPaymentStrictReceiveOp.sendMax),
          destination: (0, _ed["default"])(body.pathPaymentStrictReceiveOp.destination),
          destAsset: (0, _asset["default"])(body.pathPaymentStrictReceiveOp.destAsset),
          destAmount: (0, _amount["default"])(body.pathPaymentStrictReceiveOp.destAmount)
        };

        if (body.pathPaymentStrictReceiveOp.path && body.pathPaymentStrictReceiveOp.path.length) {
          var path = [];

          var _iterator2 = _createForOfIteratorHelper(body.pathPaymentStrictReceiveOp.path),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var p = _step2.value;
              path.push((0, _asset["default"])(p));
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          params.path = path;
        }

        newOperations.push(params);
      } else if (body._type === operationNames.pathPaymentStrictSend) {
        var _params = {
          type: body._type,
          sendAsset: (0, _asset["default"])(body.pathPaymentStrictSendOp.sendAsset),
          sendAmount: (0, _amount["default"])(body.pathPaymentStrictSendOp.sendAmount),
          destination: (0, _ed["default"])(body.pathPaymentStrictSendOp.destination),
          destAsset: (0, _asset["default"])(body.pathPaymentStrictSendOp.destAsset),
          destMin: (0, _amount["default"])(body.pathPaymentStrictSendOp.destMin)
        };

        if (body.pathPaymentStrictSendOp.path && body.pathPaymentStrictSendOp.path.length) {
          var _path = [];

          var _iterator3 = _createForOfIteratorHelper(body.pathPaymentStrictSendOp.path),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _p = _step3.value;

              _path.push((0, _asset["default"])(_p));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          _params.path = _path;
        }

        newOperations.push(_params);
      } else if (body._type === operationNames.manageBuyOffer) {
        newOperations.push({
          type: body._type,
          selling: (0, _asset["default"])(body.manageBuyOfferOp.selling),
          buying: (0, _asset["default"])(body.manageBuyOfferOp.buying),
          buyAmount: (0, _amount["default"])(body.manageBuyOfferOp.buyAmount),
          price: body.manageBuyOfferOp.price,
          offerId: body.manageBuyOfferOp.offerId
        });
      } else if (body._type === operationNames.manageSellOffer) {
        newOperations.push({
          type: body._type,
          selling: (0, _asset["default"])(body.manageSellOfferOp.selling),
          buying: (0, _asset["default"])(body.manageSellOfferOp.buying),
          amount: (0, _amount["default"])(body.manageSellOfferOp.amount),
          price: body.manageSellOfferOp.price,
          offerId: body.manageSellOfferOp.offerId
        });
      } else if (body._type === operationNames.createPassiveSellOffer) {
        newOperations.push({
          type: body._type,
          selling: (0, _asset["default"])(body.createPassiveSellOfferOp.selling),
          buying: (0, _asset["default"])(body.createPassiveSellOfferOp.buying),
          amount: (0, _amount["default"])(body.createPassiveSellOfferOp.amount),
          price: body.createPassiveSellOfferOp.price
        });
      } else if (body._type === operationNames.setOption || body._type === operationNames.setOptions) {
        var _params2 = {
          type: body._type
        };

        if (body.setOptionsOp.lowThreshold) {
          _params2.lowThreshold = body.setOptionsOp.lowThreshold;
        }

        if (body.setOptionsOp.medThreshold) {
          _params2.medThreshold = body.setOptionsOp.medThreshold;
        }

        if (body.setOptionsOp.highThreshold) {
          _params2.highThreshold = body.setOptionsOp.highThreshold;
        }

        if (body.setOptionsOp.signer) {
          _params2.signer = {
            key: (0, _ed["default"])(body.setOptionsOp.signer.key),
            weight: body.setOptionsOp.signer.weight
          };
        }

        if (body.setOptionsOp.homeDomain) {
          _params2.homeDomain = (0, _removeNull["default"])(body.setOptionsOp.homeDomain.toString());
        }

        if (body.setOptionsOp.masterWeight) {
          _params2.masterWeight = body.setOptionsOp.masterWeight;
        }

        if (body.setOptionsOp.setFlags) {
          _params2.setFlags = body.setOptionsOp.setFlags;
        }

        if (body.setOptionsOp.clearFlags) {
          _params2.clearFlags = body.setOptionsOp.clearFlags;
        }

        if (body.setOptionsOp.inflationDest) {
          _params2.inflationDest = (0, _ed["default"])(body.setOptionsOp.inflationDest);
        }

        newOperations.push(_params2);
      } else if (body._type === operationNames.changeTrust) {
        newOperations.push({
          type: body._type,
          asset: (0, _asset["default"])(body.changeTrustOp.line),
          limit: body.changeTrustOp.limit
        });
      } else if (body._type === operationNames.allowTrust) {
        newOperations.push({
          type: body._type,
          trustor: (0, _ed["default"])(body.allowTrustOp.trustor),
          asset: (0, _asset["default"])(body.allowTrustOp.asset),
          authorize: body.allowTrustOp.authorize
        });
      } else if (body._type === operationNames.accountMerge) {
        newOperations.push({
          type: body._type,
          destination: (0, _ed["default"])(body.destination)
        });
      } else if (body._type === operationNames.manageData) {
        newOperations.push({
          type: body._type,
          name: body.manageDataOp.dataName,
          value: (0, _removeNull["default"])(body.manageDataOp.dataValue.toString())
        });
      } else if (body._type === operationNames.bumpSequence) {
        newOperations.push({
          type: body._type,
          bumpTo: body.bumpSequenceOp.bumpTo
        });
      } else {
        newOperations.push({
          type: body._type
        });
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return newOperations;
};

exports["default"] = _default;