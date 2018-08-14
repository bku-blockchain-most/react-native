import config from './default.conf';

/** Environment */
import env from './dev.conf';
// import env from './prod.conf';

export default {...config, ...env};
