module.exports = createJWTPayload = (email) => {
  return {
    sub: email, // Subject (typically the user ID)
    iat: Math.floor(Date.now() / 1000), // Issued At (current time in seconds)
    exp: Math.floor(Date.now() / 1000) + 60 * 30, // Expiration time (30 minutes from now)
  };
};
