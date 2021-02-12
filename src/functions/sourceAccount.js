import StellarSdk from 'stellar-sdk';

export default (ed25519) => {
  const keypair = new StellarSdk.Keypair({
    type: 'ed25519',
    publicKey: Buffer.from(ed25519, 'base64'),
  });

  return keypair.publicKey();
}
