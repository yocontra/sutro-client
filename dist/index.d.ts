import combineUrl from './combineUrl';
import { RequestOptions, ServerMeta, Resources, ResourceDescriptor } from './typings';
declare const replaceWithPromises: <O extends Record<any, ResourceDescriptor | ServerMeta>>(obj: O, globalOptions: RequestOptions) => Resources<O>;
export default replaceWithPromises;
export { combineUrl };
