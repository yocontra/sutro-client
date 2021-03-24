import { Options } from './ky';
export declare type ResourceDescriptor = {
    path: string;
    method: string;
};
export declare type ServerMeta = {
    [key: string]: ResourceDescriptor | ServerMeta;
};
export declare type RequestOptionsFlat = {
    method?: Options['method'];
    url?: string;
    rewriteLargeRequests?: boolean;
    root?: string;
    data?: unknown;
    options?: {
        [key: string]: any;
    };
    headers?: Options['headers'];
    simple?: boolean;
    hooks?: Options['hooks'];
    retry?: Options['retry'];
    credentials?: Options['credentials'];
    cache?: Options['cache'];
    timeout?: Options['timeout'];
    parse?: (data: string) => Promise<unknown>;
    onError?: (error: Error) => void;
    onData?: Options['onDownloadProgress'];
};
export declare type RequestOptions = RequestOptionsFlat | {
    root?: () => RequestOptionsFlat['root'];
    url?: () => RequestOptionsFlat['url'];
    credentials?: () => RequestOptionsFlat['credentials'];
    retry?: () => RequestOptionsFlat['retry'];
    headers?: () => RequestOptionsFlat['headers'];
    options?: () => RequestOptionsFlat['options'];
    data?: () => RequestOptionsFlat['data'];
};
export declare type ResponseObject = {
    ok: Response['ok'];
    status: Response['status'];
    headers: Response['headers'];
    body?: unknown;
    text?: string;
};
export declare type ResponseObjectSimple = string | unknown;
export declare type RequestObject = Promise<ResponseObject | ResponseObjectSimple> & {
    cancel?: () => void;
};
export declare type Resource = (() => RequestObject) & {
    getOptions: () => RequestOptions;
};
export declare type Resources = {
    [key: string]: any;
};
