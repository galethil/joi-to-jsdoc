const lodash = require('lodash');

const getNumber = () => {
  return 'number'
}

const getString = () => {
  return 'string'
}

const getBoolean = () => {
  return 'boolean'
}

const getDate = () => {
  return 'string'
}

const getAlternatives = () => {
  return '*'
}

const getObject = (description) => {
  const rJsdoc = [];

  lodash.forOwn(description.children, (value, key) => {
    const example = generateJsdocFromDescription(value);

    const isSimpleKeyName = key.match(/^\w+$/);
    const quoteSign = isSimpleKeyName ? '' : '\'';

    rJsdoc.push(`${quoteSign}${key}${quoteSign}: ${example}`);
  });

  return `{${rJsdoc.join(', ')}}`;
}

const getArray = (description) => {
  const rJsdoc = description.items.map((item) => {
    return `${generateJsdocFromDescription(item)}[]`;
  });

  return `(${rJsdoc.join('|')})`;
}

/**
 * @returns jsdoc typedef
 */
const generateJsdocFromDescription = (description) => {
  if (description.type === 'number') {
    return getNumber();
  } else if (description.type === 'string') {
    return getString(description);
  } else if (description.type === 'boolean') {
    return getBoolean();
  } else if (description.type === 'date') {
    return getDate();
  } else if (description.type === 'object') {
    return getObject(description);
  } else if (description.type === 'array') {
    return getArray(description);
  } else if (description.type === 'alternatives') {
    return getAlternatives(description);
  }
}

const generateJsdoc = (joi) => {
  if (!joi) throw new Error('No Joi definition was passed.');

  const description = joi.describe();
  return generateJsdocFromDescription(description);
};

module.exports = generateJsdoc;
exports.default = generateJsdoc;

