import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export const client = createClient({ url: 'libsql://holerite-db-lfals.turso.io', authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTgzMTcyMDUsImlkIjoiMWIzOGRhYjQtMWU2Ny00YmMzLWIxMjctN2FkMGI1ZTcwMTkzIn0.nLTBbyD2KiGg2MxBFnPSQXuJwlp775d5TVtpRCugiIGW_HSKXH6VSyLtiSDLu1S11fj1TLsZHEfdfqoOAumXCw' });

export const db = drizzle(client);


