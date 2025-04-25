const registerTokenSchema = {
  tags: ['tokens'],
  description: 'Register a new device token for push notifications',
  body: {
    type: 'object',
    required: ['token', 'platform'],
    properties: {
      token: { type: 'string', minLength: 1, description: 'Firebase device token' },
      platform: { type: 'string', enum: ['android', 'ios'], description: 'Device platform' },
      userId: { type: 'string', nullable: true, description: 'User ID associated with the token' },
    },
  },
  response: {
    200: {
      description: 'Successfully registered token',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        token: { type: 'string' },
      },
    },
    400: {
      description: 'Invalid request body',
      type: 'object',
      properties: {
        success: { type: 'boolean', default: false },
        error: { type: 'string' },
      },
    },
    500: {
      description: 'Server error',
      type: 'object',
      properties: {
        success: { type: 'boolean', default: false },
        error: { type: 'string' },
      },
    },
  },
};

const deleteTokenSchema = {
  tags: ['tokens'],
  description: 'Delete a specific device token',
  params: {
    type: 'object',
    required: ['token'],
    properties: {
      token: { type: 'string', description: 'Firebase device token to delete' },
    },
  },
  response: {
    200: {
      description: 'Successfully deleted token',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
      },
    },
    500: {
      description: 'Server error',
      type: 'object',
      properties: {
        success: { type: 'boolean', default: false },
        error: { type: 'string' },
      },
    },
  },
};

const deleteUserTokensSchema = {
  tags: ['tokens'],
  description: 'Delete all tokens associated with a specific user',
  params: {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: { type: 'string', description: 'User ID to delete tokens for' },
    },
  },
  response: {
    200: {
      description: 'Successfully deleted user tokens',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        tokensRemoved: { type: 'number', description: 'Number of tokens removed' },
      },
    },
    500: {
      description: 'Server error',
      type: 'object',
      properties: {
        success: { type: 'boolean', default: false },
        error: { type: 'string' },
      },
    },
  },
};

const sendNotificationSchema = {
  tags: ['notifications'],
  description: 'Send a push notification to devices',
  body: {
    type: 'object',
    required: ['title', 'body', 'targetType'],
    properties: {
      title: { 
        type: 'string', 
        minLength: 1, 
        description: 'Notification title',
        example: 'New Message' 
      },
      body: { 
        type: 'string', 
        minLength: 1, 
        description: 'Notification content/message',
        example: 'You have received a new message' 
      },
      targetType: { 
        type: 'string', 
        enum: ['token', 'user', 'all'], 
        description: 'Type of target: single token, user, or all registered devices',
        example: 'user' 
      },
      targetId: { 
        type: 'string', 
        nullable: true, 
        description: 'ID of the target (token string for token type, userId for user type)',
        example: 'user123' 
      },
      data: { 
        type: 'object',
        additionalProperties: true,
        description: 'Additional data to send with the notification',
        example: { messageId: '123', chatId: '456' }
      },
      imageUrl: { 
        type: 'string', 
        nullable: true, 
        description: 'Optional image URL for the notification',
        example: 'https://example.com/notification-image.jpg' 
      },
    },
  },
  response: {
    200: {
      description: 'Notification send status',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        successCount: { type: 'number', description: 'Number of devices that received the notification' },
        failureCount: { type: 'number', description: 'Number of devices that failed to receive the notification' },
      },
    },
    400: {
      description: 'Invalid request',
      type: 'object',
      properties: {
        success: { type: 'boolean', default: false },
        error: { type: 'string' },
      },
    },
    500: {
      description: 'Server error',
      type: 'object',
      properties: {
        success: { type: 'boolean', default: false },
        error: { type: 'string' },
      },
    },
  },
};

module.exports = {
  registerTokenSchema,
  deleteTokenSchema,
  deleteUserTokensSchema,
  sendNotificationSchema,
};
