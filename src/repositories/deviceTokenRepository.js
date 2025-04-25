const { AppDataSource } = require('../config/database');

// Get the repository instance
const getDeviceTokenRepository = () => 
  AppDataSource.getRepository('DeviceToken');

// Add a new device token
const saveToken = async (tokenData) => {
  const repo = getDeviceTokenRepository();
  const existingToken = await repo.findOne({ where: { token: tokenData.token } });
  
  if (existingToken) {
    // Update existing token information
    existingToken.platform = tokenData.platform;
    existingToken.userId = tokenData.userId;
    return repo.save(existingToken);
  }
  
  // Create a new token
  const newToken = repo.create({
    token: tokenData.token,
    platform: tokenData.platform,
    userId: tokenData.userId,
  });
  
  return repo.save(newToken);
};

// Get all tokens, optionally filtered by userId
const getTokens = async (userId) => {
  const repo = getDeviceTokenRepository();
  const query = {};
  
  if (userId) {
    query.userId = userId;
  }
  
  return repo.find({ where: query });
};

// Remove a specific token
const removeToken = async (token) => {
  const repo = getDeviceTokenRepository();
  const result = await repo.delete({ token });
  return result.affected > 0;
};

// Remove all tokens for a user
const removeUserTokens = async (userId) => {
  const repo = getDeviceTokenRepository();
  const result = await repo.delete({ userId });
  return result.affected > 0;
};

module.exports = {
  getDeviceTokenRepository,
  saveToken,
  getTokens,
  removeToken,
  removeUserTokens,
};