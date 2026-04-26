/**
 * SiYuan API Client / 思源笔记 API 客户端
 *
 * Supports both local and cloud instances
 * 支持本地和云端实例
 */
export interface SiyuanConfig {
    /** API URL - 本地: http://127.0.0.1:6806, 云端: https://your-cloud.com */
    url: string;
    /** API Token */
    token: string;
}
export interface ApiResponse<T = any> {
    code: number;
    msg: string;
    data: T;
}
export declare class SiyuanApiError extends Error {
    code: number;
    endpoint: string;
    constructor(message: string, code: number, endpoint: string);
}
export declare class SiyuanApi {
    private config;
    private base;
    private headers;
    constructor(config: SiyuanConfig);
    /**
     * Make API call with timeout and retry / 带超时和重试的 API 调用
     */
    call<T = any>(path: string, body?: any, retries?: number): Promise<T>;
    listNotebooks(): Promise<{
        notebooks: Array<{
            id: string;
            name: string;
            icon: string;
            sort: number;
            closed: boolean;
        }>;
    }>;
    openNotebook(notebook: string): Promise<any>;
    closeNotebook(notebook: string): Promise<any>;
    renameNotebook(notebook: string, name: string): Promise<any>;
    createNotebook(name: string): Promise<any>;
    removeNotebook(notebook: string): Promise<any>;
    getNotebookConf(notebook: string): Promise<any>;
    setNotebookConf(notebook: string, conf: Record<string, any>): Promise<any>;
    createDocWithMd(notebook: string, path: string, markdown: string): Promise<string>;
    renameDoc(notebook: string, path: string, title: string): Promise<any>;
    renameDocById(id: string, title: string): Promise<any>;
    removeDoc(notebook: string, path: string): Promise<any>;
    removeDocById(id: string, notebook?: string): Promise<any>;
    moveDocs(fromPaths: string[], toNotebook: string, toPath: string): Promise<any>;
    moveDocsById(fromIDs: string[], toID: string): Promise<any>;
    insertBlock(dataType: string, data: string, parentID: string, prevID?: string): Promise<any>;
    prependBlock(dataType: string, data: string, parentID: string): Promise<any>;
    appendBlock(dataType: string, data: string, parentID: string): Promise<any>;
    updateBlock(id: string, dataType: string, data: string): Promise<any>;
    deleteBlock(id: string): Promise<any>;
    moveBlock(id: string, targetID: string, targetBlockID: string, targetIndex: number): Promise<any>;
    getBlockKramdown(id: string): Promise<{
        id: string;
        kramdown: string;
    }>;
    getChildBlocks(id: string): Promise<{
        id: string;
        type: string;
        content: string;
        markdown: string;
    }[]>;
    foldBlock(id: string): Promise<any>;
    unfoldBlock(id: string): Promise<any>;
    transferBlockRef(srcBlockID: string, dstBlockID: string): Promise<any>;
    getBlockAttrs(id: string): Promise<any>;
    setBlockAttrs(id: string, attrs: Record<string, string>): Promise<any>;
    getHPathByPath(notebook: string, path: string): Promise<string>;
    getHPathById(id: string): Promise<string>;
    getPathById(id: string): Promise<{
        notebook: string;
        path: string;
    }>;
    getIDsByHPath(notebook: string, path: string): Promise<string[]>;
    sqlQuery(stmt: string): Promise<any>;
    flushTransaction(): Promise<any>;
    getFile(path: string): Promise<any>;
    putFile(path: string, file: string): Promise<any>;
    removeFile(path: string): Promise<any>;
    renameFile(path: string, name: string): Promise<any>;
    readDir(path: string, start?: number, limit?: number): Promise<any>;
    exportMdContent(id: string): Promise<any>;
    exportResources(id: string, path: string): Promise<any>;
    pandocConvert(id: string, from: string, to: string): Promise<any>;
    renderTemplate(id: string, name: string): Promise<any>;
    renderSprig(name: string, params: Record<string, any>): Promise<any>;
    uploadAsset(fileName: string, isRemote?: boolean, file?: string): Promise<any>;
    getAssetPath(): Promise<string>;
    getVersion(): Promise<{
        version: string;
    }>;
    getCurrentTime(): Promise<{
        time: string;
    }>;
    getBootProgress(): Promise<{
        progress: number;
    }>;
    pushMsg(msg: string, channel?: string): Promise<any>;
    pushErrMsg(msg: string): Promise<any>;
}
//# sourceMappingURL=siyuan.d.ts.map