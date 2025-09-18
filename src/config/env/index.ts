import production from './production';
import development from './development';
import { JwtSignature } from '../../shared/interface';

export const JwtSignOptions: JwtSignature = {
  issuer: 'Test',
  subject: 'Authentication Token',
  audience: 'https://test.com',
};

export default {
  production,
  development
}[process.env.TESTS_NODE_ENV ?? 'development'];
