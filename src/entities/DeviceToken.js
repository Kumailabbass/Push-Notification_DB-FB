const { EntitySchema } = require('typeorm');

const DeviceToken = new EntitySchema({
  name: 'DeviceToken',
  tableName: 'device_tokens',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    token: {
      type: 'varchar',
      unique: true,
    },
    platform: {
      type: 'varchar',
    },
    userId: {
      type: 'varchar',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
});

module.exports = { DeviceToken };