import buildPlainString from '../buildPlainString.js';

const plain = (difference) => {
  const iter = (diff, key) => {
    const result = diff.map((obj) => {
      const currentKey = (key !== '') ? `${key}.${obj.key}` : obj.key;
      if (!obj.children) {
        return buildPlainString(obj, currentKey);
      }

      return `${iter(obj.children, currentKey)}`;
    });
    const filteredLines = result.filter((line) => line !== '');
    return [...filteredLines].join('\n');
  };

  return iter(difference, '');
};

export default plain;
