/**
 * SiYuan MCP Tools Definition / 思源笔记 MCP 工具定义
 * 
 * All tools with Chinese and English descriptions
 * 所有工具的中英文描述
 */

import { z } from 'zod';

export const toolSchemas = {
  // ==================== Notebook Management / 笔记本管理 ====================
  
  list_notebooks: {
    name: 'list_notebooks',
    description: {
      zh: '列出所有笔记本，返回笔记本 ID、名称、图标等信息',
      en: 'List all notebooks, returns notebook ID, name, icon and other information',
    },
    inputSchema: { type: 'object', properties: {} },
  },

  open_notebook: {
    name: 'open_notebook',
    description: {
      zh: '打开指定笔记本，使其可以被访问',
      en: 'Open a specified notebook to make it accessible',
    },
    inputSchema: {
      type: 'object',
      properties: {
        notebook: { type: 'string', description: '笔记本 ID' },
      },
      required: ['notebook'],
    },
  },

  close_notebook: {
    name: 'close_notebook',
    description: {
      zh: '关闭指定笔记本',
      en: 'Close a specified notebook',
    },
    inputSchema: {
      type: 'object',
      properties: {
        notebook: { type: 'string', description: '笔记本 ID' },
      },
      required: ['notebook'],
    },
  },

  create_notebook: {
    name: 'create_notebook',
    description: {
      zh: '创建新笔记本',
      en: 'Create a new notebook',
    },
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: '笔记本名称' },
      },
      required: ['name'],
    },
  },

  remove_notebook: {
    name: 'remove_notebook',
    description: {
      zh: '删除笔记本（谨慎操作）',
      en: 'Remove a notebook (use with caution)',
    },
    inputSchema: {
      type: 'object',
      properties: {
        notebook: { type: 'string', description: '笔记本 ID' },
      },
      required: ['notebook'],
    },
  },

  rename_notebook: {
    name: 'rename_notebook',
    description: {
      zh: '重命名笔记本',
      en: 'Rename a notebook',
    },
    inputSchema: {
      type: 'object',
      properties: {
        notebook: { type: 'string', description: '笔记本 ID' },
        name: { type: 'string', description: '新名称' },
      },
      required: ['notebook', 'name'],
    },
  },

  get_notebook_conf: {
    name: 'get_notebook_conf',
    description: {
      zh: '获取笔记本配置（包含图标等）',
      en: 'Get notebook configuration (includes icon, etc.)',
    },
    inputSchema: {
      type: 'object',
      properties: {
        notebook: { type: 'string', description: '笔记本 ID' },
      },
      required: ['notebook'],
    },
  },

  set_notebook_conf: {
    name: 'set_notebook_conf',
    description: {
      zh: '保存笔记本配置（可设置图标，图标使用 Unicode 码点字符串如 "1f527"）',
      en: 'Save notebook configuration (can set icon, use Unicode code point string like "1f527")',
    },
    inputSchema: {
      type: 'object',
      properties: {
        notebook: { type: 'string', description: '笔记本 ID' },
        conf: { type: 'string', description: '配置 JSON 字符串' },
      },
      required: ['notebook', 'conf'],
    },
  },

  // ==================== Document Management / 文档管理 ====================

  create_doc: {
    name: 'create_doc',
    description: {
      zh: '在指定笔记本中创建新文档，支持 Markdown 内容。路径不要包含 .md 后缀',
      en: 'Create a new document in the specified notebook with Markdown content. Path should not include .md suffix',
    },
    inputSchema: {
      type: 'object',
      properties: {
        notebook: { type: 'string', description: '笔记本 ID' },
        path: { type: 'string', description: '文档路径，如 "/我的文档/test"，不要加 .md' },
        markdown: { type: 'string', description: 'Markdown 内容' },
      },
      required: ['notebook', 'path', 'markdown'],
    },
  },

  rename_doc: {
    name: 'rename_doc',
    description: {
      zh: '通过路径重命名文档',
      en: 'Rename a document by path',
    },
    inputSchema: {
      type: 'object',
      properties: {
        notebook: { type: 'string', description: '笔记本 ID' },
        path: { type: 'string', description: '文档路径' },
        title: { type: 'string', description: '新标题' },
      },
      required: ['notebook', 'path', 'title'],
    },
  },

  rename_doc_by_id: {
    name: 'rename_doc_by_id',
    description: {
      zh: '通过文档 ID 重命名文档',
      en: 'Rename a document by its ID',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '文档 ID' },
        title: { type: 'string', description: '新标题' },
      },
      required: ['id', 'title'],
    },
  },

  remove_doc: {
    name: 'remove_doc',
    description: {
      zh: '通过路径删除文档（谨慎操作）',
      en: 'Remove a document by path (use with caution)',
    },
    inputSchema: {
      type: 'object',
      properties: {
        notebook: { type: 'string', description: '笔记本 ID' },
        path: { type: 'string', description: '文档路径' },
      },
      required: ['notebook', 'path'],
    },
  },

  remove_doc_by_id: {
    name: 'remove_doc_by_id',
    description: {
      zh: '通过文档 ID 删除文档（彻底删除，无法恢复，谨慎操作）',
      en: 'Remove a document by ID (permanent deletion, cannot be recovered, use with caution)',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '文档 ID' },
      },
      required: ['id'],
    },
  },

  move_docs: {
    name: 'move_docs',
    description: {
      zh: '移动文档到其他笔记本或文件夹',
      en: 'Move documents to another notebook or folder',
    },
    inputSchema: {
      type: 'object',
      properties: {
        from_paths: { type: 'string', description: '源路径 JSON 数组，如 \'["/a.sy","/b.sy"]\'' },
        to_notebook: { type: 'string', description: '目标笔记本 ID' },
        to_path: { type: 'string', description: '目标路径' },
      },
      required: ['from_paths', 'to_notebook', 'to_path'],
    },
  },

  move_docs_by_id: {
    name: 'move_docs_by_id',
    description: {
      zh: '通过 ID 移动文档到其他笔记本',
      en: 'Move documents by ID to another notebook',
    },
    inputSchema: {
      type: 'object',
      properties: {
        from_ids: { type: 'string', description: '源文档 ID JSON 数组，如 \'["xxx","yyy"]\'' },
        to_id: { type: 'string', description: '目标父文档 ID 或笔记本 ID' },
      },
      required: ['from_ids', 'to_id'],
    },
  },

  // ==================== Block Operations / 块级操作 ====================

  insert_block: {
    name: 'insert_block',
    description: {
      zh: '在指定位置插入块（支持 markdown 自动识别）',
      en: 'Insert a block at the specified position (supports auto markdown detection)',
    },
    inputSchema: {
      type: 'object',
      properties: {
        dataType: { type: 'string', description: '数据类型（可选，默认自动检测：markdown 或 dom）' },
        markdown: { type: 'string', description: 'Markdown 内容（可选，优先级高于 data，自动设 dataType=markdown）' },
        data: { type: 'string', description: '块内容（当 markdown 未提供时使用）' },
        parentID: { type: 'string', description: '父块 ID' },
        prevID: { type: 'string', description: '前一个块 ID（可选）' },
      },
      required: ['parentID'],
    },
  },

  prepend_block: {
    name: 'prepend_block',
    description: {
      zh: '在父块内最前面插入块（支持 markdown 自动识别）',
      en: 'Insert a block at the beginning of parent block (supports auto markdown detection)',
    },
    inputSchema: {
      type: 'object',
      properties: {
        dataType: { type: 'string', description: '数据类型（可选，默认自动检测）' },
        markdown: { type: 'string', description: 'Markdown 内容（可选，优先级高于 data）' },
        data: { type: 'string', description: '块内容' },
        parentID: { type: 'string', description: '父块 ID' },
      },
      required: ['parentID'],
    },
  },

  append_block: {
    name: 'append_block',
    description: {
      zh: '在父块内最后面追加块（支持 markdown 自动识别）',
      en: 'Append a block at the end of parent block (supports auto markdown detection)',
    },
    inputSchema: {
      type: 'object',
      properties: {
        dataType: { type: 'string', description: '数据类型（可选，默认自动检测）' },
        markdown: { type: 'string', description: 'Markdown 内容（可选，优先级高于 data，自动设 dataType=markdown）' },
        data: { type: 'string', description: '块内容' },
        parentID: { type: 'string', description: '父块 ID' },
      },
      required: ['parentID'],
    },
  },

  update_block: {
    name: 'update_block',
    description: {
      zh: '更新块内容',
      en: 'Update block content',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '块 ID' },
        dataType: { type: 'string', description: '数据类型' },
        data: { type: 'string', description: '新内容' },
      },
      required: ['id', 'dataType', 'data'],
    },
  },

  delete_block: {
    name: 'delete_block',
    description: {
      zh: '删除块',
      en: 'Delete a block',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '块 ID' },
      },
      required: ['id'],
    },
  },

  move_block: {
    name: 'move_block',
    description: {
      zh: '移动块到新位置',
      en: 'Move a block to a new position',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '块 ID' },
        targetID: { type: 'string', description: '目标父块 ID' },
        targetBlockID: { type: 'string', description: '目标位置参考块 ID' },
        targetIndex: { type: 'number', description: '目标索引位置' },
      },
      required: ['id', 'targetID', 'targetBlockID', 'targetIndex'],
    },
  },

  get_block_kramdown: {
    name: 'get_block_kramdown',
    description: {
      zh: '获取块的 Kramdown 源码',
      en: 'Get block kramdown source code',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '块或文档 ID' },
      },
      required: ['id'],
    },
  },

  get_child_blocks: {
    name: 'get_child_blocks',
    description: {
      zh: '获取指定块的子块列表',
      en: 'Get child blocks of a specified block',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '块 ID' },
      },
      required: ['id'],
    },
  },

  fold_block: {
    name: 'fold_block',
    description: {
      zh: '折叠块',
      en: 'Fold a block',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '块 ID' },
      },
      required: ['id'],
    },
  },

  unfold_block: {
    name: 'unfold_block',
    description: {
      zh: '展开块',
      en: 'Unfold a block',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '块 ID' },
      },
      required: ['id'],
    },
  },

  transfer_block_ref: {
    name: 'transfer_block_ref',
    description: {
      zh: '转移块引用',
      en: 'Transfer block reference',
    },
    inputSchema: {
      type: 'object',
      properties: {
        srcBlockID: { type: 'string', description: '源块 ID' },
        dstBlockID: { type: 'string', description: '目标块 ID' },
      },
      required: ['srcBlockID', 'dstBlockID'],
    },
  },

  // ==================== Attributes / 属性管理 ====================

  get_block_attrs: {
    name: 'get_block_attrs',
    description: {
      zh: '获取块属性',
      en: 'Get block attributes',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '块 ID' },
      },
      required: ['id'],
    },
  },

  set_block_attrs: {
    name: 'set_block_attrs',
    description: {
      zh: '设置块属性',
      en: 'Set block attributes',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '块 ID' },
        attrs: { type: 'string', description: '属性 JSON 对象' },
      },
      required: ['id', 'attrs'],
    },
  },

  // ==================== Path Query / 路径查询 ====================

  get_hpath_by_path: {
    name: 'get_hpath_by_path',
    description: {
      zh: '通过存储路径获取可读路径',
      en: 'Get human-readable path by storage path',
    },
    inputSchema: {
      type: 'object',
      properties: {
        notebook: { type: 'string', description: '笔记本 ID' },
        path: { type: 'string', description: '存储路径' },
      },
      required: ['notebook', 'path'],
    },
  },

  get_hpath_by_id: {
    name: 'get_hpath_by_id',
    description: {
      zh: '通过 ID 获取可读路径',
      en: 'Get human-readable path by ID',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '块或文档 ID' },
      },
      required: ['id'],
    },
  },

  get_path_by_id: {
    name: 'get_path_by_id',
    description: {
      zh: '通过 ID 获取存储路径',
      en: 'Get storage path by ID',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '块或文档 ID' },
      },
      required: ['id'],
    },
  },

  get_ids_by_hpath: {
    name: 'get_ids_by_hpath',
    description: {
      zh: '通过可读路径获取 ID',
      en: 'Get IDs by human-readable path',
    },
    inputSchema: {
      type: 'object',
      properties: {
        notebook: { type: 'string', description: '笔记本 ID' },
        path: { type: 'string', description: '可读路径' },
      },
      required: ['notebook', 'path'],
    },
  },

  // ==================== SQL / 数据库查询 ====================

  sql_query: {
    name: 'sql_query',
    description: {
      zh: '执行 SQL 查询（只读，建议使用 SELECT 语句）',
      en: 'Execute SQL query (read-only, recommend using SELECT statements)',
    },
    inputSchema: {
      type: 'object',
      properties: {
        sql: { type: 'string', description: 'SQL 查询语句' },
      },
      required: ['sql'],
    },
  },

  flush_transaction: {
    name: 'flush_transaction',
    description: {
      zh: '提交所有挂起的事务',
      en: 'Flush all pending transactions',
    },
    inputSchema: { type: 'object', properties: {} },
  },

  // ==================== File / 文件操作 ====================

  get_file: {
    name: 'get_file',
    description: {
      zh: '读取文件内容',
      en: 'Read file content',
    },
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: '文件路径' },
      },
      required: ['path'],
    },
  },

  put_file: {
    name: 'put_file',
    description: {
      zh: '写入文件内容',
      en: 'Write file content',
    },
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: '文件路径' },
        file: { type: 'string', description: '文件内容（Base64 或纯文本）' },
      },
      required: ['path', 'file'],
    },
  },

  remove_file: {
    name: 'remove_file',
    description: {
      zh: '删除文件（谨慎操作）',
      en: 'Remove a file (use with caution)',
    },
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: '文件路径' },
      },
      required: ['path'],
    },
  },

  rename_file: {
    name: 'rename_file',
    description: {
      zh: '重命名文件',
      en: 'Rename a file',
    },
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: '当前文件路径' },
        name: { type: 'string', description: '新文件名' },
      },
      required: ['path', 'name'],
    },
  },

  read_dir: {
    name: 'read_dir',
    description: {
      zh: '列出目录中的文件',
      en: 'List files in a directory',
    },
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: '目录路径' },
        start: { type: 'number', description: '起始偏移' },
        limit: { type: 'number', description: '返回数量限制' },
      },
    },
  },

  // ==================== Export / 导出 ====================

  export_md_content: {
    name: 'export_md_content',
    description: {
      zh: '导文档为 Markdown 文本',
      en: 'Export document as Markdown text',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '文档 ID' },
      },
      required: ['id'],
    },
  },

  export_resources: {
    name: 'export_resources',
    description: {
      zh: '导出文档使用的资源文件',
      en: 'Export resource files used by a document',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '文档 ID' },
        path: { type: 'string', description: '导出目标路径' },
      },
      required: ['id', 'path'],
    },
  },

  pandoc_convert: {
    name: 'pandoc_convert',
    description: {
      zh: '使用 Pandoc 转换文档格式',
      en: 'Convert document format using Pandoc',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '文档 ID' },
        from: { type: 'string', description: '源格式' },
        to: { type: 'string', description: '目标格式' },
      },
      required: ['id', 'from', 'to'],
    },
  },

  // ==================== Template / 模板 ====================

  render_template: {
    name: 'render_template',
    description: {
      zh: '渲染思源模板',
      en: 'Render SiYuan template',
    },
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '文档 ID' },
        name: { type: 'string', description: '模板名称' },
      },
      required: ['id', 'name'],
    },
  },

  render_sprig: {
    name: 'render_sprig',
    description: {
      zh: '渲染 Sprig 模板函数',
      en: 'Render Sprig template function',
    },
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: '模板函数名称' },
      },
      required: ['name'],
    },
  },

  // ==================== Asset / 资源 ====================

  upload_asset: {
    name: 'upload_asset',
    description: {
      zh: '上传资源文件到思源笔记',
      en: 'Upload asset file to SiYuan Note',
    },
    inputSchema: {
      type: 'object',
      properties: {
        fileName: { type: 'string', description: '文件名' },
        isRemote: { type: 'boolean', description: '是否远程文件' },
      },
      required: ['fileName'],
    },
  },

  // ==================== System / 系统 ====================

  get_version: {
    name: 'get_version',
    description: {
      zh: '获取思源笔记版本',
      en: 'Get SiYuan Note version',
    },
    inputSchema: { type: 'object', properties: {} },
  },

  get_current_time: {
    name: 'get_current_time',
    description: {
      zh: '获取系统当前时间',
      en: 'Get system current time',
    },
    inputSchema: { type: 'object', properties: {} },
  },

  get_boot_progress: {
    name: 'get_boot_progress',
    description: {
      zh: '获取思源笔记启动进度',
      en: 'Get SiYuan Note boot progress',
    },
    inputSchema: { type: 'object', properties: {} },
  },

  check_siyuan_status: {
    name: 'check_siyuan_status',
    description: {
      zh: '检查思源笔记连接状态和 API 可用性',
      en: 'Check SiYuan Note connection status and API availability',
    },
    inputSchema: { type: 'object', properties: {} },
  },

  get_workspace_info: {
    name: 'get_workspace_info',
    description: {
      zh: '获取工作空间和连接信息',
      en: 'Get workspace and connection information',
    },
    inputSchema: { type: 'object', properties: {} },
  },

  push_msg: {
    name: 'push_msg',
    description: {
      zh: '推送通知消息',
      en: 'Push notification message',
    },
    inputSchema: {
      type: 'object',
      properties: {
        msg: { type: 'string', description: '消息内容' },
        channel: { type: 'string', description: '消息频道（info/success/warning/error）' },
      },
      required: ['msg'],
    },
  },

  push_err_msg: {
    name: 'push_err_msg',
    description: {
      zh: '推送错误消息通知',
      en: 'Push error message notification',
    },
    inputSchema: {
      type: 'object',
      properties: {
        msg: { type: 'string', description: '错误消息内容' },
      },
      required: ['msg'],
    },
  },
} as const;

export type ToolName = keyof typeof toolSchemas;
