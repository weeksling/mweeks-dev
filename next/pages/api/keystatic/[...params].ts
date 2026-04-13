import path from 'path';
import { makeAPIRouteHandler } from '@keystatic/next/api';
import keystaticConfig from '../../../keystatic.config';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

export default makeAPIRouteHandler({
  config: keystaticConfig,
  localBaseDirectory: path.resolve(process.cwd(), '..'),
});
