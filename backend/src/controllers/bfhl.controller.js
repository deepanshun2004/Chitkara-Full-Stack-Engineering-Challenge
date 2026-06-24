const { buildHierarchyResponse } = require("../services/hierarchy.service");
const { validatePayload } = require("../validators/request.validator");

function processBfhlRequest(req, res, next) {
  try {
    const validation = validatePayload(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    return res.status(200).json(buildHierarchyResponse(validation.data));
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  processBfhlRequest
};
