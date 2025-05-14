const { EntitySchema } = require('typeorm');

const Location = new EntitySchema({
  name: 'Location',
  tableName: 'locations',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    latitude: {
      type: 'varchar',
    },
    longitude: {
      type: 'varchar',
    },
    userId: {
      type: 'varchar',
      nullable: true,
    },
    fcmToken: {
      type: 'varchar',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
});

module.exports = { Location };
