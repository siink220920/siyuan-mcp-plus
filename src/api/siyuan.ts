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

export class SiyuanApiError extends Error {
  constructor(
    message: string,
    public code: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'SiyuanApiError';
  }
}

export class SiyuanApi {
  private base: string;
  private headers: Record<string, string>;

  constructor(private config: SiyuanConfig) {
    this.base = config.url.replace(/\/$/, '');
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.token}`,
    };
  }

  /**
   * Make API call with timeout and retry / 带超时和重试的 API 调用
   */
  async call<T = any>(path: string, body?: any, retries = 1): Promise<T> {
    const url = `${this.base}${path}`;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(body || {}),
          signal: AbortSignal.timeout(30000), // 30s timeout
        });

        if (!res.ok) {
          throw new SiyuanApiError(
            `HTTP ${res.status}: ${res.statusText}`,
            res.status,
            path
          );
        }

        let json: ApiResponse<T>;
        try {
          json = JSON.parse(await res.text()) as ApiResponse<T>;
        } catch {
          throw new SiyuanApiError(
            `Invalid JSON response from ${path}`,
            -2,
            path
          );
        }

        if (json.code !== 0) {
          throw new SiyuanApiError(
            json.msg || `API Error code: ${json.code}`,
            json.code,
            path
          );
        }

        return json.data as T;
      } catch (err) {
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
    return this.call<{ notebooks: Array<{
      id: string;
      name: string;
      icon: string;
      sort: number;
      closed: boolean;
    }> }>('/api/notebook/lsNotebooks');
  }

  async openNotebook(notebook: string) {
    return this.call('/api/notebook/openNotebook', { notebook });
  }

  async closeNotebook(notebook: string) {
    return this.call('/api/notebook/closeNotebook', { notebook });
  }

  async renameNotebook(notebook: string, name: string) {
    return this.call('/api/notebook/renameNotebook', { notebook, name });
  }

  async createNotebook(name: string) {
    return this.call('/api/notebook/createNotebook', { name });
  }

  async removeNotebook(notebook: string) {
    return this.call('/api/notebook/removeNotebook', { notebook });
  }

  async getNotebookConf(notebook: string) {
    return this.call('/api/notebook/getNotebookConf', { notebook });
  }

  async setNotebookConf(notebook: string, conf: Record<string, any>) {
    return this.call('/api/notebook/setNotebookConf', { notebook, conf });
  }

  // ==================== Document / 文档管理 ====================

  async createDocWithMd(notebook: string, path: string, markdown: string) {
    return this.call<string>('/api/filetree/createDocWithMd', { notebook, path, markdown });
  }

  async renameDoc(notebook: string, path: string, title: string) {
    return this.call('/api/filetree/renameDoc', { notebook, path, title });
  }

  async renameDocById(id: string, title: string) {
    return this.call('/api/filetree/renameDocByID', { id, title });
  }

  async removeDoc(notebook: string, path: string) {
    return this.call('/api/filetree/removeDoc', { notebook, path });
  }

  async removeDocById(id: string) {
    return this.call('/api/filetree/removeDocByID', { id });
  }

  async moveDocs(fromPaths: string[], toNotebook: string, toPath: string) {
    return this.call('/api/filetree/moveDocs', { fromPaths, toNotebook, toPath });
  }

  async moveDocsById(fromIDs: string[], toID: string) {
    return this.call('/api/filetree/moveDocsByID', { fromIDs, toID });
  }

  // ==================== Block / 块级操作 ====================

  async insertBlock(dataType: string, data: string, parentID: string, prevID?: string) {
    return this.call('/api/block/insertBlock', { dataType, data, parentID, prevID });
  }

  async prependBlock(dataType: string, data: string, parentID: string) {
    return this.call('/api/block/prependBlock', { dataType, data, parentID });
  }

  async appendBlock(dataType: string, data: string, parentID: string) {
    return this.call('/api/block/appendBlock', { dataType, data, parentID });
  }

  async updateBlock(id: string, dataType: string, data: string) {
    return this.call('/api/block/updateBlock', { id, dataType, data });
  }

  async deleteBlock(id: string) {
    return this.call('/api/block/deleteBlock', { id });
  }

  async moveBlock(id: string, targetID: string, targetBlockID: string, targetIndex: number) {
    return this.call('/api/block/moveBlock', { id, targetID, targetBlockID, targetIndex });
  }

  async getBlockKramdown(id: string) {
    return this.call<{ id: string; kramdown: string }>(`/api/block/getBlockKramdown?notebook=&id=${id}`, {});
  }

  async getChildBlocks(id: string) {
    return this.call<Array<{ id: string; type: string; content: string; markdown: string }>>(
      '/api/block/getChildBlocks', { id }
    );
  }

  async foldBlock(id: string) {
    return this.call('/api/block/foldBlock', { id });
  }

  async unfoldBlock(id: string) {
    return this.call('/api/block/unfoldBlock', { id });
  }

  async transferBlockRef(srcBlockID: string, dstBlockID: string) {
    return this.call('/api/block/transferBlockRef', { srcBlockID, dstBlockID });
  }

  // ==================== Attributes / 属性管理 ====================

  async getBlockAttrs(id: string) {
    return this.call('/api/attr/getBlockAttrs', { id });
  }

  async setBlockAttrs(id: string, attrs: Record<string, string>) {
    return this.call('/api/attr/setBlockAttrs', { id, attrs });
  }

  // ==================== Path Query / 路径查询 ====================

  async getHPathByPath(notebook: string, path: string) {
    return this.call<string>('/api/filetree/getHPathByPath', { notebook, path });
  }

  async getHPathById(id: string) {
    return this.call<string>('/api/filetree/getHPathByID', { id });
  }

  async getPathById(id: string) {
    return this.call<{ notebook: string; path: string }>('/api/filetree/getPathByID', { id });
  }

  async getIDsByHPath(notebook: string, path: string) {
    return this.call<string[]>('/api/filetree/getIDsByHPath', { notebook, path });
  }

  // ==================== SQL / 数据库查询 ====================

  async sqlQuery(stmt: string) {
    return this.call('/api/query/sql', { stmt });
  }

  async flushTransaction() {
    return this.call('/api/sqlite/flushTransaction');
  }

  // ==================== File / 文件操作 ====================

  async getFile(path: string) {
    return this.call('/api/file/getFile', { path });
  }

  async putFile(path: string, file: string) {
    return this.call('/api/file/putFile', { path, file });
  }

  async removeFile(path: string) {
    return this.call('/api/file/removeFile', { path });
  }

  async renameFile(path: string, name: string) {
    return this.call('/api/file/renameFile', { path, name });
  }

  async readDir(path: string, start: number = 0, limit: number = 100) {
    return this.call('/api/file/getFile', { path, start, limit });
  }

  // ==================== Export / 导出 ====================

  async exportMdContent(id: string) {
    return this.call('/api/export/exportMdContent', { id });
  }

  async exportResources(id: string, path: string) {
    return this.call('/api/export/exportResources', { id, path });
  }

  async pandocConvert(id: string, from: string, to: string) {
    return this.call('/api/convert/pandoc', { id, from, to });
  }

  // ==================== Template / 模板渲染 ====================

  async renderTemplate(id: string, name: string) {
    return this.call('/api/template/render', { id, name });
  }

  async renderSprig(name: string, params: Record<string, any>) {
    return this.call('/api/template/renderSprig', { name, ...params });
  }

  // ==================== Asset / 资源上传 ====================

  async uploadAsset(fileName: string, isRemote: boolean = false, file?: string) {
    return this.call('/api/asset/upload', { fileName, isRemote, file });
  }

  async getAssetPath() {
    return this.call<string>('/api/asset/getAssertPath', {});
  }

  // ==================== System / 系统 ====================

  async getVersion() {
    return this.call<{ version: string }>('/api/system/version', {});
  }

  async getCurrentTime() {
    return this.call<{ time: string }>('/api/system/currentTime', {});
  }

  async getBootProgress() {
    return this.call<{ progress: number }>('/api/system/bootProgress', {});
  }

  async pushMsg(msg: string, channel: string = 'info') {
    return this.call('/api/notification/pushMsg', { msg, channel });
  }

  async pushErrMsg(msg: string) {
    return this.call('/api/notification/pushErrMsg', { msg });
  }
}
