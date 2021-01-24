import { toJSON } from 'json-xdr';
import StellarSdk from 'stellar-sdk';

import memoParser from './functions/memo';
import ed25519parser from './functions/ed25519';
import operationsParser from './functions/operations';

export default (xdr) => {
  const object = toJSON(StellarSdk.xdr.TransactionEnvelope.fromXDR(xdr, 'base64'));
  const parsed = {};
  const tx = object.v1.tx;

  if (tx.fee) {
    parsed.fee = tx.fee;
  }

  if (tx.seqNum) {
    parsed.seqNum = tx.seqNum;
  }

  if (tx.memo) {
    parsed.memo = memoParser(tx.memo);
  }

  if (tx.timeBounds) {
    parsed.timeBounds = tx.timeBounds;
  }

  if (tx.sourceAccount) {
    parsed.sourceAccount = ed25519parser(tx.sourceAccount);
  }

  if (tx.operations) {
    parsed.operations = operationsParser(tx.operations)
  }

  console.log(JSON.stringify(object, null, 2));
  console.log();
  console.log();
  console.log(JSON.stringify(parsed, null, 2));
};
