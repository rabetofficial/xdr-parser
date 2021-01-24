import removeNull from './removeNull';
import assetParser from './asset';
import amountParser from './amount';
import ed25519parser from './ed25519';
import * as operationNames from '../static/operations';

export default (operations) => {
  const newOperations = [];

  for (const operation of operations) {
    const { body } = operation;

    if (body._type === operationNames.payment) {
      newOperations.push({
        type: body._type,
        asset: assetParser(body.paymentOp.asset),
        amount: amountParser(body.paymentOp.amount),
        destination: ed25519parser(body.paymentOp.destination),
      });
    }

    else if (body._type === operationNames.createAccount) {
      newOperations.push({
        type: body._type,
        destination: ed25519parser(body.createAccountOp.destination),
        startingBalance: amountParser(body.createAccountOp.startingBalance),
      });
    }

    else if (body._type === operationNames.pathPaymentStrictReceive) {
      const params = {
        type: body._type,
        sendAsset: assetParser(body.pathPaymentStrictReceiveOp.sendAsset),
        sendMax: amountParser(body.pathPaymentStrictReceiveOp.sendMax),
        destination: ed25519parser(body.pathPaymentStrictReceiveOp.destination),
        destAsset: assetParser(body.pathPaymentStrictReceiveOp.destAsset),
        destAmount: amountParser(body.pathPaymentStrictReceiveOp.destAmount),
      };

      if (body.pathPaymentStrictReceiveOp.path && body.pathPaymentStrictReceiveOp.path.length) {
        const path = [];

        for (const p of body.pathPaymentStrictReceiveOp.path) {
          path.push(assetParser(p));
        }

        params.path = path;
      }

      newOperations.push(params);
    }

    else if (body._type === operationNames.pathPaymentStrictSend) {
      const params = {
        type: body._type,
        sendAsset: assetParser(body.pathPaymentStrictSendOp.sendAsset),
        sendAmount: amountParser(body.pathPaymentStrictSendOp.sendAmount),
        destination: ed25519parser(body.pathPaymentStrictSendOp.destination),
        destAsset: assetParser(body.pathPaymentStrictSendOp.destAsset),
        destMin: amountParser(body.pathPaymentStrictSendOp.destMin),
      };

      if (body.pathPaymentStrictSendOp.path && body.pathPaymentStrictSendOp.path.length) {
        const path = [];

        for (const p of body.pathPaymentStrictSendOp.path) {
          path.push(assetParser(p));
        }

        params.path = path;
      }

      newOperations.push(params);
    }

    else if (body._type === operationNames.manageBuyOffer) {
      newOperations.push({
        type: body._type,
        selling: assetParser(body.manageBuyOfferOp.selling),
        buying: assetParser(body.manageBuyOfferOp.buying),
        buyAmount: amountParser(body.manageBuyOfferOp.buyAmount),
        price: body.manageBuyOfferOp.price,
        offerId: body.manageBuyOfferOp.offerId,
      });
    }

    else if (body._type === operationNames.manageSellOffer) {
      newOperations.push({
        type: body._type,
        selling: assetParser(body.manageSellOfferOp.selling),
        buying: assetParser(body.manageSellOfferOp.buying),
        amount: amountParser(body.manageSellOfferOp.amount),
        price: body.manageSellOfferOp.price,
        offerId: body.manageSellOfferOp.offerId,
      });
    }

    else if (body._type === operationNames.createPassiveSellOffer) {
      newOperations.push({
        type: body._type,
        selling: assetParser(body.createPassiveSellOfferOp.selling),
        buying: assetParser(body.createPassiveSellOfferOp.buying),
        amount: amountParser(body.createPassiveSellOfferOp.amount),
        price: body.createPassiveSellOfferOp.price,
      });
    }

    else if (body._type === operationNames.setOption || body._type === operationNames.setOptions) {
      const params = {
        type: body._type,
      };

      if (body.setOptionsOp.lowThreshold) {
        params.lowThreshold = body.setOptionsOp.lowThreshold;
      }

      if (body.setOptionsOp.medThreshold) {
        params.medThreshold = body.setOptionsOp.medThreshold;
      }

      if (body.setOptionsOp.highThreshold) {
        params.highThreshold = body.setOptionsOp.highThreshold;
      }

      if (body.setOptionsOp.signer) {
        params.signer = {
          key: ed25519parser(body.setOptionsOp.signer.key),
          weight: body.setOptionsOp.signer.weight,
        };
      }

      if (body.setOptionsOp.homeDomain) {
        params.homeDomain = removeNull(body.setOptionsOp.homeDomain.toString());
      }

      if (body.setOptionsOp.masterWeight) {
        params.masterWeight = body.setOptionsOp.masterWeight;
      }

      if (body.setOptionsOp.setFlags) {
        params.setFlags = body.setOptionsOp.setFlags;
      }

      if (body.setOptionsOp.clearFlags) {
        params.clearFlags = body.setOptionsOp.clearFlags;
      }

      if (body.setOptionsOp.inflationDest) {
        params.inflationDest = ed25519parser(body.setOptionsOp.inflationDest);
      }

      newOperations.push(params);
    }

    else if (body._type === operationNames.changeTrust) {
      newOperations.push({
        type: body._type,
        asset: assetParser(body.changeTrustOp.line),
        limit: body.changeTrustOp.limit,
      });
    }

    else if (body._type === operationNames.allowTrust) {
      newOperations.push({
        type: body._type,
        trustor: ed25519parser(body.allowTrustOp.trustor),
        asset: assetParser(body.allowTrustOp.asset),
        authorize: body.allowTrustOp.authorize,
      });
    }

    else if (body._type === operationNames.accountMerge) {
      newOperations.push({
        type: body._type,
        destination: ed25519parser(body.destination),
      });
    }

    else if (body._type === operationNames.manageData) {
      newOperations.push({
        type: body._type,
        name: body.manageDataOp.dataName,
        value: removeNull(body.manageDataOp.dataValue.toString()),
      });
    }

    else if (body._type === operationNames.bumpSequence) {
      newOperations.push({
        type: body._type,
        bumpTo: body.bumpSequenceOp.bumpTo,
      });
    }

    else {
      newOperations.push({
        type: body._type,
      });
    }
  }

  return newOperations;
}
