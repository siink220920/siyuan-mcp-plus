/**
 * SiYuan API Client
 * 思源笔记 API 客户端
 *
 * Supports both local and cloud instances
 * 支持本地和云端实例
 */
export class SiyuanApiError extends Error {
    code;
    endpoint;
    constructor(message, code, endpoint) {
        super(message);
        this.code = code;
        this.endpoint = endpoint;
        this.name = 'SiyuanApiError';
    }
}
export class SiyuanApi {
    config;
    base;
    headers;
    constructor(config) {
        this.config = config;
        this.base = config.url.replace(/\/$/, '');
        // Support both "Bearer Token" and "Token Token" formats
        // 思源本地和云端 API 均支持 Authorization: Bearer Token
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.token}`,
        };
    }
    /**
     * Make API call / 执行 API 调用
     */
    async call(path, body) {
        const url = `${this.base}${path}`;
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(body || {}),
            });
            if (!res.ok) {
                throw new SiyuanApiError(`HTTP ${res.status}: ${res.statusText}`, res.status, path);
            }
            const json = await res.json();
            if (json.code !== 0) {
                throw new SiyuanApiError(json.msg || `API Error code: ${json.code}`, json.code, path);
            }
            return json.data;
        }
        catch (err) {
            if (err instanceof SiyuanApiError) {
                throw err;
            }
            throw new SiyuanApiError(err instanceof Error ? err.message : String(err), -1, path);
        }
    }
    // ==================== Notebook / 笔记本管理 ====================
    /** List all notebooks / 列出所有笔记本 */
    async listNotebooks() {
        return this.call('/api/notebook/lsNotebooks');
    }
    /** Open notebook / 打开笔记本 */
    async openNotebook(notebook) {
        return this.call('/api/notebook/openNotebook', { notebook });
    }
    /** Close notebook / 关闭笔记本 */
    async closeNotebook(notebook) {
        return this.call('/api/notebook/closeNotebook', { notebook });
    }
    /** Rename notebook / 重命名笔记本 */
    async renameNotebook(notebook, name) {
        return this.call('/api/notebook/renameNotebook', { notebook, name });
    }
    /** Create notebook / 创建笔记本 */
    async createNotebook(name) {
        return this.call('/api/notebook/createNotebook', { name });
    }
    /** Remove notebook / 删除笔记本 */
    async removeNotebook(notebook) {
        return this.call('/api/notebook/removeNotebook', { notebook });
    }
    /** Get notebook config / 获取笔记本配置 */
    async getNotebookConf(notebook) {
        return this.call('/api/notebook/getNotebookConf', { notebook });
    }
    /** Save notebook config / 保存笔记本配置 */
    async setNotebookConf(notebook, conf) {
        return this.call('/api/notebook/setNotebookConf', { notebook, conf });
    }
    // ==================== Document / 文档管理 ====================
    /** Create document with Markdown / 使用 Markdown 创建文档 */
    async createDocWithMd(notebook, path, markdown) {
        return this.call('/api/filetree/createDocWithMd', { notebook, path, markdown });
    }
    /** Rename document / 重命名文档 */
    async renameDoc(notebook, path, title) {
        return this.call('/api/filetree/renameDoc', { notebook, path, title });
    }
    /** Rename document by ID / 通过 ID 重命名文档 */
    async renameDocById(id, title) {
        return this.call('/api/filetree/renameDocByID', { id, title });
    }
    /** Remove document / 删除文档 */
    async removeDoc(notebook, path) {
        return this.call('/api/filetree/removeDoc', { notebook, path });
    }
    /** Remove document by ID / 通过 ID 删除文档 */
    async removeDocById(id) {
        return this.call('/api/filetree/removeDocByID', { id });
    }
    /** Move documents / 移动文档 */
    async moveDocs(fromPaths, toNotebook, toPath) {
        return this.call('/api/filetree/moveDocs', { fromPaths, toNotebook, toPath });
    }
    /** Move documents by ID / 通过 ID 移动文档 */
    async moveDocsById(fromIDs, toID) {
        return this.call('/api/filetree/moveDocsByID', { fromIDs, toID });
    }
    // ==================== Block / 块级操作 ====================
    /** Insert block / 插入块 */
    async insertBlock(dataType, data, parentID, prevID) {
        return this.call('/api/block/insertBlock', { dataType, data, parentID, prevID });
    }
    /** Prepend block / 前置插入块 */
    async prependBlock(dataType, data, parentID) {
        return this.call('/api/block/prependBlock', { dataType, data, parentID });
    }
    /** Append block / 后置追加块 */
    async appendBlock(dataType, data, parentID) {
        return this.call('/api/block/appendBlock', { dataType, data, parentID });
    }
    /** Update block / 更新块 */
    async updateBlock(id, dataType, data) {
        return this.call('/api/block/updateBlock', { id, dataType, data });
    }
    /** Delete block / 删除块 */
    async deleteBlock(id) {
        return this.call('/api/block/deleteBlock', { id });
    }
    /** Move block / 移动块 */
    async moveBlock(id, targetID, targetBlockID, targetIndex) {
        return this.call('/api/block/moveBlock', { id, targetID, targetBlockID, targetIndex });
    }
    /** Get block kramdown / 获取块 Kramdown 源码 */
    async getBlockKramdown(id) {
        return this.call(`/api/block/getBlockKramdown?notebook=&id=${id}`, {});
    }
    /** Get child blocks / 获取子块 */
    async getChildBlocks(id) {
        return this.call('/api/block/getChildBlocks', { id });
    }
    /** Fold block / 折叠块 */
    async foldBlock(id) {
        return this.call('/api/block/foldBlock', { id });
    }
    /** Unfold block / 展开块 */
    async unfoldBlock(id) {
        return this.call('/api/block/unfoldBlock', { id });
    }
    /** Transfer block ref / 转移块引用 */
    async transferBlockRef(srcBlockID, dstBlockID) {
        return this.call('/api/block/transferBlockRef', { srcBlockID, dstBlockID });
    }
    // ==================== Attributes / 属性管理 ====================
    /** Get block attributes / 获取块属性 */
    async getBlockAttrs(id) {
        return this.call('/api/filetree/getBlockAttrs', { id });
    }
    /** Set block attributes / 设置块属性 */
    async setBlockAttrs(id, attrs) {
        return this.call('/api/filetree/setBlockAttrs', { id, attrs });
    }
    // ==================== Path Query / 路径查询 ====================
    /** Get human-readable path by path / 通过路径获取可读路径 */
    async getHPathByPath(notebook, path) {
        return this.call('/api/filetree/getHPathByPath', { notebook, path });
    }
    /** Get human-readable path by ID / 通过 ID 获取可读路径 */
    async getHPathById(id) {
        return this.call('/api/filetree/getHPathByID', { id });
    }
    /** Get storage path by ID / 通过 ID 获取存储路径 */
    async getPathById(id) {
        return this.call('/api/filetree/getPathByID', { id });
    }
    /** Get IDs by human-readable path / 通过可读路径获取 IDs */
    async getIDsByHPath(notebook, path) {
        return this.call('/api/filetree/getIDsByHPath', { notebook, path });
    }
    // ==================== SQL / 数据库查询 ====================
    /** Execute SQL query / 执行 SQL 查询 */
    async sqlQuery(stmt) {
        return this.call('/api/query/sql', { stmt });
    }
    /** Flush transaction / 提交事务 */
    async flushTransaction() {
        return this.call('/api/sqlite/flushTransaction');
    }
    // ==================== File / 文件操作 ====================
    /** Get file / 获取文件 */
    async getFile(path) {
        return this.call('/api/file森林公园/getFile', { path });
    }
    /** Put file / 写入文件 */
    async putFile(path, file) {
        return this.call('/api/file森林公园/putFile', { path, file });
    }
    /** Remove file / 删除文件 */
    async removeFile(path) {
        return this.call('/api/file森林公园/removeFile', { path });
    }
    /** Rename file / 重命名文件 */
    async renameFile(path, name) {
        return this.call('/api/file森林公园/renameFile', { path, name });
    }
    /** List files / 列出文件 */
    async readDir(path, start = 0, limit = 100) {
        return this.call('/api/file森林公园/getFile', { path, start, limit });
    }
    // ==================== Export / 导出 ====================
    /** Export markdown content / 导出 Markdown 内容 */
    async exportMdContent(id) {
        return this.call('/api/export/exportMdContent', { id });
    }
    /** Export resources / 导出资源文件 */
    async exportResources(id, path) {
        return this.call('/api/export/exportResources', { id, path });
    }
    /** Pandoc conversion / Pandoc 格式转换 */
    async pandocConvert(id, from, to) {
        return this.call('/api/export/pandocConvert', { id, from, to });
    }
    // ==================== Template / 模板渲染 ====================
    /** Render template / 渲染模板 */
    async renderTemplate(id, name) {
        return this.call('/api/template/renderTemplate', { id, name });
    }
    /** Render sprig template / 渲染 Sprig 模板 */
    async renderSprig(name, params) {
        return this.call('/api/template/renderSprig', { name, ...params });
    }
    // ==================== Asset / 资源上传 ====================
    /** Upload asset / 上传资源文件 */
    async uploadAsset(fileName, isRemote = false, file) {
        return this.call('/api/asset/upload', { fileName, isRemote, file });
    }
    /** Get asset path / 获取资源路径 */
    async getAssetPath() {
        return this.call('/api/asset/getAssertPath', {});
    }
    // ==================== System / 系统 ====================
    /** Get system version / 获取系统版本 */
    async getVersion() {
        return this.call('/api/system/version', {});
    }
    /** Get current time / 获取当前时间 */
    async getCurrentTime() {
        return this.call('/api/system/currentTime', {});
    }
    /** Get boot progress / 获取启动进度 */
    async getBootProgress() {
        return this.call('/api/system/getBootProgress', {});
    }
    /** Push message / 推送消息 */
    async pushMsg(msg, channel = 'info') {
        return this.call('/api/notify/pushMsg', { msg, channel });
    }
    /** Push error message / 推送错误消息 */
    async pushErrMsg(msg) {
        return this.call('/api/notify/pushErrMsg', { msg });
    }
}
//# sourceMappingURL=siyuan.js.map