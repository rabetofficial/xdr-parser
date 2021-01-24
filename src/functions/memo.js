export default (memo) => {
  if (!memo._type) {
    return {
      type: 'none',
    };
  }

  if (memo._type === 'memoText') {
    return {
      type: 'text',
      value: memo.text,
    };
  }

  if (memo._type === 'memoId') {
    return {
      type: 'id',
      value: memo.id,
    };
  }

  if (memo._type === 'memoHash') {
    return {
      type: 'hash',
      value: memo.hash,
    };
  }

  if (memo._type === 'memoReturn') {
    return {
      type: 'return',
      value: memo.retHash,
    };
  }

  return {
    type: 'none',
  }; 
}
