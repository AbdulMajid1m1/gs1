import { PrismaClient } from '@prisma/clientOldGs1Db';
const oldGs1Prisma = new PrismaClient();

import { PrismaClient as PrismaClientGs1Dl } from '@prisma/clientGs1Dl';
const gs1dlPrisma = new PrismaClientGs1Dl();

import { PrismaClient as PrismaClientWtrace } from '@prisma/clientWtrace';
const wtracePrisma = new PrismaClientWtrace();

export { gs1dlPrisma };
export { wtracePrisma };
export { oldGs1Prisma };