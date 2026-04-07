/**
 * SiYuan API Client
 * 思源笔记 API 客户端
 *
 * Supports both local and cloud instances
 * 支持本地和云端实例
 */
export interface SiyuanConfig {
    /** API URL - 本地: http://127.0.0.1:6806, 云端: https://note.uuxj.com */
    url: string;
    /** API Token - 本地设置中获取，云端为用户令牌 */
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
     * Make API call / 执行 API 调用
     */
    call<T = any>(path: string, body?: any): Promise<T>;
    /** List all notebooks / 列出所有笔记本 */
    listNotebooks(): Promise<{
        notebooks: Array<{
            id: string;
            name: string;
            icon: string;
            sort: number;
            closed: boolean;
        }>;
    }>;
    /** Open notebook / 打开笔记本 */
    openNotebook(notebook: string): Promise<any>;
    /** Close notebook / 关闭笔记本 */
    closeNotebook(notebook: string): Promise<any>;
    /** Rename notebook / 重命名笔记本 */
    renameNotebook(notebook: string, name: string): Promise<any>;
    /** Create notebook / 创建笔记本 */
    createNotebook(name: string): Promise<any>;
    /** Remove notebook / 删除笔记本 */
    removeNotebook(notebook: string): Promise<any>;
    /** Get notebook config / 获取笔记本配置 */
    getNotebookConf(notebook: string): Promise<any>;
    /** Save notebook config / 保存笔记本配置 */
    setNotebookConf(notebook: string, conf: Record<string, any>): Promise<any>;
    /** Create document with Markdown / 使用 Markdown 创建文档 */
    createDocWithMd(notebook: string, path: string, markdown: string): Promise<string>;
    /** Rename document / 重命名文档 */
    renameDoc(notebook: string, path: string, title: string): Promise<any>;
    /** Rename document by ID / 通过 ID 重命名文档 */
    renameDocById(id: string, title: string): Promise<any>;
    /** Remove document / 删除文档 */
    removeDoc(notebook: string, path: string): Promise<any>;
    /** Remove document by ID / 通过 ID 删除文档 */
    removeDocById(id: string): Promise<any>;
    /** Move documents / 移动文档 */
    moveDocs(fromPaths: string[], toNotebook: string, toPath: string): Promise<any>;
    /** Move documents by ID / 通过 ID 移动文档 */
    moveDocsById(fromIDs: string[], toID: string): Promise<any>;
    /** Insert block / 插入块 */
    insertBlock(dataType: string, data: string, parentID: string, prevID?: string): Promise<any>;
    /** Prepend block / 前置插入块 */
    prependBlock(dataType: string, data: string, parentID: string): Promise<any>;
    /** Append block / 后置追加块 */
    appendBlock(dataType: string, data: string, parentID: string): Promise<any>;
    /** Update block / 更新块 */
    updateBlock(id: string, dataType: string, data: string): Promise<any>;
    /** Delete block / 删除块 */
    deleteBlock(id: string): Promise<any>;
    /** Move block / 移动块 */
    moveBlock(id: string, targetID: string, targetBlockID: string, targetIndex: number): Promise<any>;
    /** Get block kramdown / 获取块 Kramdown 源码 */
    getBlockKramdown(id: string): Promise<{
        id: string;
        kramdown: string;
    }>;
    /** Get child blocks / 获取子块 */
    getChildBlocks(id: string): Promise<{
        id: string;
        type: string;
        content: string;
        markdown: string;
    }[]>;
    /** Fold block / 折叠块 */
    foldBlock(id: string): Promise<any>;
    /** Unfold block / 展开块 */
    unfoldBlock(id: string): Promise<any>;
    /** Transfer block ref / 转移块引用 */
    transferBlockRef(srcBlockID: string, dstBlockID: string): Promise<any>;
    /** Get block attributes / 获取块属性 */
    getBlockAttrs(id: string): Promise<any>;
    /** Set block attributes / 设置块属性 */
    setBlockAttrs(id: string, attrs: Record<string, string>): Promise<any>;
    /** Get human-readable path by path / 通过路径获取可读路径 */
    getHPathByPath(notebook: string, path: string): Promise<string>;
    /** Get human-readable path by ID / 通过 ID 获取可读路径 */
    getHPathById(id: string): Promise<string>;
    /** Get storage path by ID / 通过 ID 获取存储路径 */
    getPathById(id: string): Promise<{
        notebook: string;
        path: string;
    }>;
    /** Get IDs by human-readable path / 通过可读路径获取 IDs */
    getIDsByHPath(notebook: string, path: string): Promise<string[]>;
    /** Execute SQL query / 执行 SQL 查询 */
    sqlQuery(stmt: string): Promise<any>;
    /** Flush transaction / 提交事务 */
    flushTransaction(): Promise<any>;
    /** Get file / 获取文件 */
    getFile(path: string): Promise<any>;
    /** Put file / 写入文件 */
    putFile(path: string, file: string): Promise<any>;
    /** Remove file / 删除文件 */
    removeFile(path: string): Promise<any>;
    /** Rename file / 重命名文件 */
    renameFile(path: string, name: string): Promise<any>;
    /** List files / 列出文件 */
    readDir(path: string, start?: number, limit?: number): Promise<any>;
    /** Export markdown content / 导出 Markdown 内容 */
    exportMdContent(id: string): Promise<any>;
    /** Export resources / 导出资源文件 */
    exportResources(id: string, path: string): Promise<any>;
    /** Pandoc conversion / Pandoc 格式转换 */
    pandocConvert(id: string, from: string, to: string): Promise<any>;
    /** Render template / 渲染模板 */
    renderTemplate(id: string, name: string): Promise<any>;
    /** Render sprig template / 渲染 Sprig 模板 */
    renderSprig(name: string, params: Record<string, any>): Promise<any>;
    /** Upload asset / 上传资源文件 */
    uploadAsset(fileName: string, isRemote?: boolean, file?: string): Promise<any>;
    /** Get asset path / 获取资源路径 */
    getAssetPath(): Promise<string>;
    /** Get system version / 获取系统版本 */
    getVersion(): Promise<{
        version: string;
    }>;
    /** Get current time / 获取当前时间 */
    getCurrentTime(): Promise<{
        time: string;
    }>;
    /** Get boot progress / 获取启动进度 */
    getBootProgress(): Promise<{
        progress: number;
    }>;
    /** Push message / 推送消息 */
    pushMsg(msg: string, channel?: string): Promise<any>;
    /** Push error message / 推送错误消息 */
    pushErrMsg(msg: string): Promise<any>;
}
//# sourceMappingURL=siyuan.d.ts.map