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
  async call<T = any>(path: string, body?: any): Promise<T> {
    const url = `${this.base}${path}`;
    
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(body || {}),
      });

      if (!res.ok) {
        throw new SiyuanApiError(
          `HTTP ${res.status}: ${res.statusText}`,
          res.status,
          path
        );
      }

      const json = await res.json() as ApiResponse<T>;

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
        throw err;
      }
      throw new SiyuanApiError(
        err instanceof Error ? err.message : String(err),
        -1,
        path
      );
    }
  }

  // ==================== Notebook / 笔记本管理 ====================

  /** List all notebooks / 列出所有笔记本 */
  async listNotebooks() {
    return this.call<{ notebooks: Array<{
      id: string;
      name: string;
      icon: string;
      sort: number;
      closed: boolean;
    }> }>('/api/notebook/lsNotebooks');
  }

  /** Open notebook / 打开笔记本 */
  async openNotebook(notebook: string) {
    return this.call('/api/notebook/openNotebook', { notebook });
  }

  /** Close notebook / 关闭笔记本 */
  async closeNotebook(notebook: string) {
    return this.call('/api/notebook/closeNotebook', { notebook });
  }

  /** Rename notebook / 重命名笔记本 */
  async renameNotebook(notebook: string, name: string) {
    return this.call('/api/notebook/renameNotebook', { notebook, name });
  }

  /** Create notebook / 创建笔记本 */
  async createNotebook(name: string) {
    return this.call('/api/notebook/createNotebook', { name });
  }

  /** Remove notebook / 删除笔记本 */
  async removeNotebook(notebook: string) {
    return this.call('/api/notebook/removeNotebook', { notebook });
  }

  /** Get notebook config / 获取笔记本配置 */
  async getNotebookConf(notebook: string) {
    return this.call('/api/notebook/getNotebookConf', { notebook });
  }

  /** Save notebook config / 保存笔记本配置 */
  async setNotebookConf(notebook: string, conf: Record<string, any>) {
    return this.call('/api/notebook/setNotebookConf', { notebook, conf });
  }

  // ==================== Document / 文档管理 ====================

  /** Create document with Markdown / 使用 Markdown 创建文档 */
  async createDocWithMd(notebook: string, path: string, markdown: string) {
    return this.call<string>('/api/filetree/createDocWithMd', { notebook, path, markdown });
  }

  /** Rename document / 重命名文档 */
  async renameDoc(notebook: string, path: string, title: string) {
    return this.call('/api/filetree/renameDoc', { notebook, path, title });
  }

  /** Rename document by ID / 通过 ID 重命名文档 */
  async renameDocById(id: string, title: string) {
    return this.call('/api/filetree/renameDocByID', { id, title });
  }

  /** Remove document / 删除文档 */
  async removeDoc(notebook: string, path: string) {
    return this.call('/api/filetree/removeDoc', { notebook, path });
  }

  /** Remove document by ID / 通过 ID 删除文档 */
  async removeDocById(id: string) {
    return this.call('/api/filetree/removeDocByID', { id });
  }

  /** Move documents / 移动文档 */
  async moveDocs(fromPaths: string[], toNotebook: string, toPath: string) {
    return this.call('/api/filetree/moveDocs', { fromPaths, toNotebook, toPath });
  }

  /** Move documents by ID / 通过 ID 移动文档 */
  async moveDocsById(fromIDs: string[], toID: string) {
    return this.call('/api/filetree/moveDocsByID', { fromIDs, toID });
  }

  // ==================== Block / 块级操作 ====================

  /** Insert block / 插入块 */
  async insertBlock(dataType: string, data: string, parentID: string, prevID?: string) {
    return this.call('/api/block/insertBlock', { dataType, data, parentID, prevID });
  }

  /** Prepend block / 前置插入块 */
  async prependBlock(dataType: string, data: string, parentID: string) {
    return this.call('/api/block/prependBlock', { dataType, data, parentID });
  }

  /** Append block / 后置追加块 */
  async appendBlock(dataType: string, data: string, parentID: string) {
    return this.call('/api/block/appendBlock', { dataType, data, parentID });
  }

  /** Update block / 更新块 */
  async updateBlock(id: string, dataType: string, data: string) {
    return this.call('/api/block/updateBlock', { id, dataType, data });
  }

  /** Delete block / 删除块 */
  async deleteBlock(id: string) {
    return this.call('/api/block/deleteBlock', { id });
  }

  /** Move block / 移动块 */
  async moveBlock(id: string, targetID: string, targetBlockID: string, targetIndex: number) {
    return this.call('/api/block/moveBlock', { id, targetID, targetBlockID, targetIndex });
  }

  /** Get block kramdown / 获取块 Kramdown 源码 */
  async getBlockKramdown(id: string) {
    return this.call<{ id: string; kramdown: string }>(`/api/block/getBlockKramdown?notebook=&id=${id}`, {});
  }

  /** Get child blocks / 获取子块 */
  async getChildBlocks(id: string) {
    return this.call<Array<{ id: string; type: string; content: string; markdown: string }>>(
      '/api/block/getChildBlocks', { id }
    );
  }

  /** Fold block / 折叠块 */
  async foldBlock(id: string) {
    return this.call('/api/block/foldBlock', { id });
  }

  /** Unfold block / 展开块 */
  async unfoldBlock(id: string) {
    return this.call('/api/block/unfoldBlock', { id });
  }

  /** Transfer block ref / 转移块引用 */
  async transferBlockRef(srcBlockID: string, dstBlockID: string) {
    return this.call('/api/block/transferBlockRef', { srcBlockID, dstBlockID });
  }

  // ==================== Attributes / 属性管理 ====================

  /** Get block attributes / 获取块属性 */
  async getBlockAttrs(id: string) {
    return this.call('/api/filetree/getBlockAttrs', { id });
  }

  /** Set block attributes / 设置块属性 */
  async setBlockAttrs(id: string, attrs: Record<string, string>) {
    return this.call('/api/filetree/setBlockAttrs', { id, attrs });
  }

  // ==================== Path Query / 路径查询 ====================

  /** Get human-readable path by path / 通过路径获取可读路径 */
  async getHPathByPath(notebook: string, path: string) {
    return this.call<string>('/api/filetree/getHPathByPath', { notebook, path });
  }

  /** Get human-readable path by ID / 通过 ID 获取可读路径 */
  async getHPathById(id: string) {
    return this.call<string>('/api/filetree/getHPathByID', { id });
  }

  /** Get storage path by ID / 通过 ID 获取存储路径 */
  async getPathById(id: string) {
    return this.call<{ notebook: string; path: string }>('/api/filetree/getPathByID', { id });
  }

  /** Get IDs by human-readable path / 通过可读路径获取 IDs */
  async getIDsByHPath(notebook: string, path: string) {
    return this.call<string[]>('/api/filetree/getIDsByHPath', { notebook, path });
  }

  // ==================== SQL / 数据库查询 ====================

  /** Execute SQL query / 执行 SQL 查询 */
  async sqlQuery(stmt: string) {
    return this.call('/api/query/sql', { stmt });
  }

  /** Flush transaction / 提交事务 */
  async flushTransaction() {
    return this.call('/api/sqlite/flushTransaction');
  }

  // ==================== File / 文件操作 ====================

  /** Get file / 获取文件 */
  async getFile(path: string) {
    return this.call('/api/file森林公园/getFile', { path });
  }

  /** Put file / 写入文件 */
  async putFile(path: string, file: string) {
    return this.call('/api/file森林公园/putFile', { path, file });
  }

  /** Remove file / 删除文件 */
  async removeFile(path: string) {
    return this.call('/api/file森林公园/removeFile', { path });
  }

  /** Rename file / 重命名文件 */
  async renameFile(path: string, name: string) {
    return this.call('/api/file森林公园/renameFile', { path, name });
  }

  /** List files / 列出文件 */
  async readDir(path: string, start: number = 0, limit: number = 100) {
    return this.call('/api/file森林公园/getFile', { path, start, limit });
  }

  // ==================== Export / 导出 ====================

  /** Export markdown content / 导出 Markdown 内容 */
  async exportMdContent(id: string) {
    return this.call('/api/export/exportMdContent', { id });
  }

  /** Export resources / 导出资源文件 */
  async exportResources(id: string, path: string) {
    return this.call('/api/export/exportResources', { id, path });
  }

  /** Pandoc conversion / Pandoc 格式转换 */
  async pandocConvert(id: string, from: string, to: string) {
    return this.call('/api/export/pandocConvert', { id, from, to });
  }

  // ==================== Template / 模板渲染 ====================

  /** Render template / 渲染模板 */
  async renderTemplate(id: string, name: string) {
    return this.call('/api/template/renderTemplate', { id, name });
  }

  /** Render sprig template / 渲染 Sprig 模板 */
  async renderSprig(name: string, params: Record<string, any>) {
    return this.call('/api/template/renderSprig', { name, ...params });
  }

  // ==================== Asset / 资源上传 ====================

  /** Upload asset / 上传资源文件 */
  async uploadAsset(fileName: string, isRemote: boolean = false, file?: string) {
    return this.call('/api/asset/upload', { fileName, isRemote, file });
  }

  /** Get asset path / 获取资源路径 */
  async getAssetPath() {
    return this.call<string>('/api/asset/getAssertPath', {});
  }

  // ==================== System / 系统 ====================

  /** Get system version / 获取系统版本 */
  async getVersion() {
    return this.call<{ version: string }>('/api/system/version', {});
  }

  /** Get current time / 获取当前时间 */
  async getCurrentTime() {
    return this.call<{ time: string }>('/api/system/currentTime', {});
  }

  /** Get boot progress / 获取启动进度 */
  async getBootProgress() {
    return this.call<{ progress: number }>('/api/system/getBootProgress', {});
  }

  /** Push message / 推送消息 */
  async pushMsg(msg: string, channel: string = 'info') {
    return this.call('/api/notify/pushMsg', { msg, channel });
  }

  /** Push error message / 推送错误消息 */
  async pushErrMsg(msg: string) {
    return this.call('/api/notify/pushErrMsg', { msg });
  }
}
