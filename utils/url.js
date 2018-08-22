/**
 * @format
 * @flow
 */

export const getEtherscanAddressURL = address =>
  `https://ropsten.etherscan.io/address/${address}`;

export const getEtherscanTransactionURL = txHash =>
  `https://ropsten.etherscan.io/tx/${txHash}`;
