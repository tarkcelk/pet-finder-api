const isJson = (jsonString) => {
  try {
    return !!JSON.parse(jsonString);
  } catch (error) {
    return false;
  }
};

module.exports = { isJson };
