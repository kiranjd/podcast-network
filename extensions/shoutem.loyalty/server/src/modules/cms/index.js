import { CmsSelect } from './components';
import { cmsApi } from './services';

import {
  reducer,
  moduleName,
  CATEGORIES,
  SCHEMAS,
  loadResources,
  createCategory,
  deleteResource,
  navigateToCms,
} from './redux';

export {
  moduleName,
  cmsApi,
  CATEGORIES,
  SCHEMAS,
  loadResources,
  createCategory,
  deleteResource,
  navigateToCms,
  CmsSelect,
};

export default reducer;
