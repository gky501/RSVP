import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const employees=sqliteTable('employees',{number:text('number').primaryKey(),name:text('name').notNull(),contact:text('contact').notNull(),birthday:text('birthday'),kind:text('kind').notNull().default('employee'),token:text('token').notNull().unique(),plusOne:text('plus_one').notNull().default(''),status:text('status'),updated:text('updated')});
export const settings=sqliteTable('settings',{id:text('id').primaryKey(),value:text('value').notNull()});
export const lookupLimits=sqliteTable('lookup_limits',{id:text('id').primaryKey(),count:integer('count').notNull()});
