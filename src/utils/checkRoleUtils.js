function roleValidation(headers) {
  const role = headers.request.auth.artifacts.decoded.role;
  if (role === "user") {
    return true;
  }
  return false;
}

module.exports = roleValidation;
