import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Taskists extends BaseSchema {
  protected tableName = 'taskists'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.boolean('is_completed').defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
