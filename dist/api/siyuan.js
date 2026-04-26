/**
 * SiYuan API Client / 思源笔记 API 客户端
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
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.token}`,
        };
    }
    /**
     * Make API call with timeout and retry / 带超时和重试的 API 调用
     */
    async call(path, body, retries = 1) {
        const url = `${this.base}${path}`;
        let lastError = null;
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify(body || {}),
                    signal: AbortSignal.timeout(30000), // 30s timeout
                });
                if (!res.ok) {
                    throw new SiyuanApiError(`HTTP ${res.status}: ${res.statusText}`, res.status, path);
                }
                let json;
                try {
                    json = JSON.parse(await res.text());
                }
                catch {
                    throw new SiyuanApiError(`Invalid JSON response from ${path}`, -2, path);
                }
                if (json.code !== 0) {
                    throw new SiyuanApiError(json.msg || `API Error code: ${json.code}`, json.code, path);
                }
                return json.data;
            }
            catch (err) {
                if (err instanceof SiyuanApiError) {
                    // API errors don't retry
                    throw err;
                }
                lastError = err instanceof Error ? err : new Error(String(err));
                if (attempt < retries) {
                    await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
                }
            }
        }
        throw lastError || new SiyuanApiError('Max retries exceeded', -1, path);
    }
    // ==================== Notebook / 笔记本管理 ====================
    async listNotebooks() {
        return this.call('/api/notebook/lsNotebooks');
    }
    async openNotebook(notebook) {
        return this.call('/api/notebook/openNotebook', { notebook });
    }
    async closeNotebook(notebook) {
        return this.call('/api/notebook/closeNotebook', { notebook });
    }
    async renameNotebook(notebook, name) {
        return this.call('/api/notebook/renameNotebook', { notebook, name });
    }
    async createNotebook(name) {
        return this.call('/api/notebook/createNotebook', { name });
    }
    async removeNotebook(notebook) {
        return this.call('/api/notebook/removeNotebook', { notebook });
    }
    async getNotebookConf(notebook) {
        return this.call('/api/notebook/getNotebookConf', { notebook });
    }
    async setNotebookConf(notebook, conf) {
        return this.call('/api/notebook/setNotebookConf', { notebook, conf });
    }
    // ==================== Document / 文档管理 ====================
    async createDocWithMd(notebook, path, markdown) {
        return this.call('/api/filetree/createDocWithMd', { notebook, path, markdown });
    }
    async renameDoc(notebook, path, title) {
        return this.call('/api/filetree/renameDoc', { notebook, path, title });
    }
    async renameDocById(id, title) {
        return this.call('/api/filetree/renameDocByID', { id, title });
    }
    async removeDoc(notebook, path) {
        return this.call('/api/filetree/removeDoc', { notebook, path });
    }
    async removeDocById(id, notebook) {
        return this.call('/api/filetree/removeDocByID', { id, notebook });
    }
    async moveDocs(fromPaths, toNotebook, toPath) {
        return this.call('/api/filetree/moveDocs', { fromPaths, toNotebook, toPath });
    }
    async moveDocsById(fromIDs, toID) {
        return this.call('/api/filetree/moveDocsByID', { fromIDs, toID });
    }
    // ==================== Block / 块级操作 ====================
    async insertBlock(dataType, data, parentID, prevID) {
        return this.call('/api/block/insertBlock', { dataType, data, parentID, prevID });
    }
    async prependBlock(dataType, data, parentID) {
        return this.call('/api/block/prependBlock', { dataType, data, parentID });
    }
    async appendBlock(dataType, data, parentID) {
        return this.call('/api/block/appendBlock', { dataType, data, parentID });
    }
    async updateBlock(id, dataType, data) {
        return this.call('/api/block/updateBlock', { id, dataType, data });
    }
    async deleteBlock(id) {
        return this.call('/api/block/deleteBlock', { id });
    }
    async moveBlock(id, targetID, targetBlockID, targetIndex) {
        return this.call('/api/block/moveBlock', { id, targetID, targetBlockID, targetIndex });
    }
    async getBlockKramdown(id) {
        return this.call('/api/block/getBlockKramdown', { id });
    }
    async getChildBlocks(id) {
        return this.call('/api/block/getChildBlocks', { id });
    }
    async foldBlock(id) {
        return this.call('/api/block/foldBlock', { id });
    }
    async unfoldBlock(id) {
        return this.call('/api/block/unfoldBlock', { id });
    }
    async transferBlockRef(srcBlockID, dstBlockID) {
        return this.call('/api/block/transferBlockRef', { srcBlockID, dstBlockID });
    }
    // ==================== Attributes / 属性管理 ====================
    async getBlockAttrs(id) {
        return this.call('/api/attr/getBlockAttrs', { id });
    }
    async setBlockAttrs(id, attrs) {
        return this.call('/api/attr/setBlockAttrs', { id, attrs });
    }
    // ==================== Path Query / 路径查询 ====================
    async getHPathByPath(notebook, path) {
        return this.call('/api/filetree/getHPathByPath', { notebook, path });
    }
    async getHPathById(id) {
        return this.call('/api/filetree/getHPathByID', { id });
    }
    async getPathById(id) {
        return this.call('/api/filetree/getPathByID', { id });
    }
    async getIDsByHPath(notebook, path) {
        return this.call('/api/filetree/getIDsByHPath', { notebook, path });
    }
    // ==================== SQL / 数据库查询 ====================
    async sqlQuery(stmt) {
        return this.call('/api/query/sql', { stmt });
    }
    async flushTransaction() {
        return this.call('/api/sqlite/flushTransaction');
    }
    // ==================== File / 文件操作 ====================
    async getFile(path) {
        return this.call('/api/file/getFile', { path });
    }
    async putFile(path, file) {
        return this.call('/api/file/putFile', { path, file });
    }
    async removeFile(path) {
        return this.call('/api/file/removeFile', { path });
    }
    async renameFile(path, name) {
        return this.call('/api/file/renameFile', { path, name });
    }
    async readDir(path, start = 0, limit = 100) {
        return this.call('/api/file/getFile', { path, start, limit });
    }
    // ==================== Export / 导出 ====================
    async exportMdContent(id) {
        return this.call('/api/export/exportMdContent', { id });
    }
    async exportResources(id, path) {
        return this.call('/api/export/exportResources', { id, path });
    }
    async pandocConvert(id, from, to) {
        return this.call('/api/convert/pandoc', { id, from, to });
    }
    // ==================== Template / 模板渲染 ====================
    async renderTemplate(id, name) {
        return this.call('/api/template/render', { id, name });
    }
    async renderSprig(name, params) {
        return this.call('/api/template/renderSprig', { name, ...params });
    }
    // ==================== Asset / 资源上传 ====================
    async uploadAsset(fileName, isRemote = false, file) {
        return this.call('/api/asset/upload', { fileName, isRemote, file });
    }
    async getAssetPath() {
        return this.call('/api/asset/getAssertPath', {});
    }
    // ==================== System / 系统 ====================
    async getVersion() {
        return this.call('/api/system/version', {});
    }
    async getCurrentTime() {
        return this.call('/api/system/currentTime', {});
    }
    async getBootProgress() {
        return this.call('/api/system/bootProgress', {});
    }
    async pushMsg(msg, channel = 'info') {
        return this.call('/api/notification/pushMsg', { msg, channel });
    }
    async pushErrMsg(msg) {
        return this.call('/api/notification/pushErrMsg', { msg });
    }
}
//# sourceMappingURL=siyuan.js.map