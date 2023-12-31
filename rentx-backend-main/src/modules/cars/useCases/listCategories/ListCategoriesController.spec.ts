import request from 'supertest'
import { app } from '@shared/infra/http/app'
import { hash } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm'

let connection: Connection

describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidv4()
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXXX')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to list all categories', async () => {
    const { body: { token } } = await request(app).post('/sessions').send({
      email: "admin@rentx.com.br",
      password: "admin"
    })

    await request(app).post('/categories').send({
      name: "Category supertest name",
      description: "Category supertest description"
    }).set({
      Authorization: `Bearer ${token}`
    })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(201)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('Category supertest name')
  })
})