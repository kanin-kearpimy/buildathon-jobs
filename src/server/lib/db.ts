import {
  Client,
  TablesDB,
  ID,
  type Models,
  Permission,
  Role,
} from 'node-appwrite'
import type { Jobs, Applications } from './appwrite.types'

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!)

const tablesDB = new TablesDB(client)

export const db = {
  jobs: {
    create: (
      data: Omit<Jobs, keyof Models.Row>,
      options?: { rowId?: string; permissions?: string[] },
    ) =>
      tablesDB.createRow<Jobs>({
        databaseId: process.env.APPWRITE_DB_ID!,
        tableId: 'jobs',
        rowId: options?.rowId ?? ID.unique(),
        data,
        permissions: [
          Permission.write(Role.user(data.createdBy)),
          Permission.read(Role.user(data.createdBy)),
          Permission.update(Role.user(data.createdBy)),
          Permission.delete(Role.user(data.createdBy)),
        ],
      }),
    get: (id: string) =>
      tablesDB.getRow<Jobs>({
        databaseId: process.env.APPWRITE_DB_ID!,
        tableId: 'jobs',
        rowId: id,
      }),
    update: (
      id: string,
      data: Partial<Omit<Jobs, keyof Models.Row>>,
      options?: { permissions?: string[] },
    ) =>
      tablesDB.updateRow<Jobs>({
        databaseId: process.env.APPWRITE_DB_ID!,
        tableId: 'jobs',
        rowId: id,
        data,
        ...(options?.permissions ? { permissions: options.permissions } : {}),
      }),
    delete: (id: string) =>
      tablesDB.deleteRow({
        databaseId: process.env.APPWRITE_DB_ID!,
        tableId: 'jobs',
        rowId: id,
      }),
    list: (queries?: string[]) =>
      tablesDB.listRows<Jobs>({
        databaseId: process.env.APPWRITE_DB_ID!,
        tableId: 'jobs',
        queries,
      }),
  },
  applications: {
    create: (
      data: Omit<Applications, keyof Models.Row>,
      options?: { rowId?: string; permissions?: string[] },
    ) =>
      tablesDB.createRow<Applications>({
        databaseId: process.env.APPWRITE_DB_ID!,
        tableId: 'applications',
        rowId: options?.rowId ?? ID.unique(),
        data,
        permissions: [
          Permission.write(Role.user(data.createdBy)),
          Permission.read(Role.user(data.createdBy)),
          Permission.update(Role.user(data.createdBy)),
          Permission.delete(Role.user(data.createdBy)),
        ],
      }),
    get: (id: string) =>
      tablesDB.getRow<Applications>({
        databaseId: process.env.APPWRITE_DB_ID!,
        tableId: 'applications',
        rowId: id,
      }),
    update: (
      id: string,
      data: Partial<Omit<Applications, keyof Models.Row>>,
      options?: { permissions?: string[] },
    ) =>
      tablesDB.updateRow<Applications>({
        databaseId: process.env.APPWRITE_DB_ID!,
        tableId: 'applications',
        rowId: id,
        data,
        ...(options?.permissions ? { permissions: options.permissions } : {}),
      }),
    delete: (id: string) =>
      tablesDB.deleteRow({
        databaseId: process.env.APPWRITE_DB_ID!,
        tableId: 'applications',
        rowId: id,
      }),
    list: (queries?: string[]) =>
      tablesDB.listRows<Applications>({
        databaseId: process.env.APPWRITE_DB_ID!,
        tableId: 'applications',
        queries,
      }),
  },
}
