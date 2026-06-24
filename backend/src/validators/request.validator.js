function validatePayload(payload) {
  if (!payload || !Array.isArray(payload.data)) {
    return {
      isValid: false,
      message: "Request body must contain a data array."
    };
  }

  return {
    isValid: true,
    data: payload.data
  };
}

module.exports = {
  validatePayload
};
