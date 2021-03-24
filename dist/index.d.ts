import combineUrl from './combineUrl';
import { RequestOptions, ServerMeta, Resources } from './typings';
declare const replaceWithPromises: (obj: ServerMeta, globalOptions: RequestOptions) => Resources;
export default replaceWithPromises;
export { combineUrl };
