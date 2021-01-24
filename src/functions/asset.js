import StellarSdk from 'stellar-sdk';

import removeNull from './removeNull';
import ed25519parser from './ed25519';

export default (asset) => {
  if (asset._type === 'assetTypeNative') {
    return {
      type: 'native',
    };
  }

  if (asset._type === 'assetTypeCreditAlphanum4') {
    if (asset.assetCode4) {
      const assetCode = removeNull(StellarSdk.xdr.AssetCode4.fromXDR(asset.assetCode4, 'base64').toString());

      return {
        type: 'credit_alphanum4',
        assetCode,
      };
    } else if (asset.alphaNum4) {
      let assetCode, issuer;

      if (asset.alphaNum4.assetCode) {
        assetCode = removeNull(StellarSdk.xdr.AssetCode4.fromXDR(asset.alphaNum4.assetCode, 'base64').toString());
      }

      if (asset.alphaNum4.issuer) {
        issuer = ed25519parser(asset.alphaNum4.issuer);
      }

      return {
        type: 'credit_alphanum4',
        assetCode,
        issuer,
      }
    } else {
      return {
        type: 'credit_alphanum4',
      };
    }
  }

  else if (asset._type === 'assetTypeCreditAlphanum12') {
    if (asset.assetCode12) {
      const assetCode = removeNull(StellarSdk.xdr.AssetCode12.fromXDR(asset.assetCode12, 'base64').toString());

      return {
        type: 'credit_alphanum12',
        assetCode,
      };
    } else if (asset.alphaNum12) {
      let assetCode, issuer;

      if (asset.alphaNum12.assetCode) {
        assetCode = removeNull(StellarSdk.xdr.AssetCode12.fromXDR(asset.alphaNum12.assetCode, 'base64').toString());
      }

      if (asset.alphaNum12.issuer) {
        issuer = ed25519parser(asset.alphaNum12.issuer);
      }

      return {
        type: 'credit_alphanum12',
        assetCode,
        issuer,
      }
    } else {
      return {
        type: 'credit_alphanum12',
      };
    }
  }

  else {
    return {
      type: 'unknown',
    };
  }
}
