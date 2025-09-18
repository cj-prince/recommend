import pgp from 'pg-promise';
import promise from 'bluebird';
import Env from '../shared/utils/env';

const pg = pgp({ promiseLib: promise, noWarnings: true });

console.log('looking', `${Env.get<string>('DATABASE_URL')}`)

const db = pg(Env.get<string>('DATABASE_URL'));

export { db };
