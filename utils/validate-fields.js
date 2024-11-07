const len = (value) => value.length > 0;

const fieldsAreValid = (incomingArray, allowedValues) => {
  const result = incomingArray.every((value) => allowedValues.includes(value));
  return result;
};

module.exports = { fieldsAreValid, len };
