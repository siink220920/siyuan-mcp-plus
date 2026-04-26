/**
 * SiYuan MCP Tools Definition / 思源笔记 MCP 工具定义
 *
 * All tools with Chinese and English descriptions
 * 所有工具的中英文描述
 */
export declare const toolSchemas: {
    readonly list_notebooks: {
        readonly name: "list_notebooks";
        readonly description: {
            readonly zh: "列出所有笔记本，返回笔记本 ID、名称、图标等信息";
            readonly en: "List all notebooks, returns notebook ID, name, icon and other information";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {};
        };
    };
    readonly open_notebook: {
        readonly name: "open_notebook";
        readonly description: {
            readonly zh: "打开指定笔记本，使其可以被访问";
            readonly en: "Open a specified notebook to make it accessible";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly notebook: {
                    readonly type: "string";
                    readonly description: "笔记本 ID";
                };
            };
            readonly required: readonly ["notebook"];
        };
    };
    readonly close_notebook: {
        readonly name: "close_notebook";
        readonly description: {
            readonly zh: "关闭指定笔记本";
            readonly en: "Close a specified notebook";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly notebook: {
                    readonly type: "string";
                    readonly description: "笔记本 ID";
                };
            };
            readonly required: readonly ["notebook"];
        };
    };
    readonly create_notebook: {
        readonly name: "create_notebook";
        readonly description: {
            readonly zh: "创建新笔记本";
            readonly en: "Create a new notebook";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: "string";
                    readonly description: "笔记本名称";
                };
            };
            readonly required: readonly ["name"];
        };
    };
    readonly remove_notebook: {
        readonly name: "remove_notebook";
        readonly description: {
            readonly zh: "删除笔记本（谨慎操作）";
            readonly en: "Remove a notebook (use with caution)";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly notebook: {
                    readonly type: "string";
                    readonly description: "笔记本 ID";
                };
            };
            readonly required: readonly ["notebook"];
        };
    };
    readonly rename_notebook: {
        readonly name: "rename_notebook";
        readonly description: {
            readonly zh: "重命名笔记本";
            readonly en: "Rename a notebook";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly notebook: {
                    readonly type: "string";
                    readonly description: "笔记本 ID";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "新名称";
                };
            };
            readonly required: readonly ["notebook", "name"];
        };
    };
    readonly get_notebook_conf: {
        readonly name: "get_notebook_conf";
        readonly description: {
            readonly zh: "获取笔记本配置（包含图标等）";
            readonly en: "Get notebook configuration (includes icon, etc.)";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly notebook: {
                    readonly type: "string";
                    readonly description: "笔记本 ID";
                };
            };
            readonly required: readonly ["notebook"];
        };
    };
    readonly set_notebook_conf: {
        readonly name: "set_notebook_conf";
        readonly description: {
            readonly zh: "保存笔记本配置（可设置图标，图标使用 Unicode 码点字符串如 \"1f527\"）";
            readonly en: "Save notebook configuration (can set icon, use Unicode code point string like \"1f527\")";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly notebook: {
                    readonly type: "string";
                    readonly description: "笔记本 ID";
                };
                readonly conf: {
                    readonly type: "string";
                    readonly description: "配置 JSON 字符串";
                };
            };
            readonly required: readonly ["notebook", "conf"];
        };
    };
    readonly create_doc: {
        readonly name: "create_doc";
        readonly description: {
            readonly zh: "在指定笔记本中创建新文档，支持 Markdown 内容。路径不要包含 .md 后缀";
            readonly en: "Create a new document in the specified notebook with Markdown content. Path should not include .md suffix";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly notebook: {
                    readonly type: "string";
                    readonly description: "笔记本 ID";
                };
                readonly path: {
                    readonly type: "string";
                    readonly description: "文档路径，如 \"/我的文档/test\"，不要加 .md";
                };
                readonly markdown: {
                    readonly type: "string";
                    readonly description: "Markdown 内容";
                };
            };
            readonly required: readonly ["notebook", "path", "markdown"];
        };
    };
    readonly rename_doc: {
        readonly name: "rename_doc";
        readonly description: {
            readonly zh: "通过路径重命名文档";
            readonly en: "Rename a document by path";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly notebook: {
                    readonly type: "string";
                    readonly description: "笔记本 ID";
                };
                readonly path: {
                    readonly type: "string";
                    readonly description: "文档路径";
                };
                readonly title: {
                    readonly type: "string";
                    readonly description: "新标题";
                };
            };
            readonly required: readonly ["notebook", "path", "title"];
        };
    };
    readonly rename_doc_by_id: {
        readonly name: "rename_doc_by_id";
        readonly description: {
            readonly zh: "通过文档 ID 重命名文档";
            readonly en: "Rename a document by its ID";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "文档 ID";
                };
                readonly title: {
                    readonly type: "string";
                    readonly description: "新标题";
                };
            };
            readonly required: readonly ["id", "title"];
        };
    };
    readonly remove_doc: {
        readonly name: "remove_doc";
        readonly description: {
            readonly zh: "通过路径删除文档（谨慎操作）";
            readonly en: "Remove a document by path (use with caution)";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly notebook: {
                    readonly type: "string";
                    readonly description: "笔记本 ID";
                };
                readonly path: {
                    readonly type: "string";
                    readonly description: "文档路径";
                };
            };
            readonly required: readonly ["notebook", "path"];
        };
    };
    readonly remove_doc_by_id: {
        readonly name: "remove_doc_by_id";
        readonly description: {
            readonly zh: "通过文档 ID 删除文档（彻底删除，无法恢复，谨慎操作）";
            readonly en: "Remove a document by ID (permanent deletion, cannot be recovered, use with caution)";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "文档 ID";
                };
            };
            readonly required: readonly ["id"];
        };
    };
    readonly move_docs: {
        readonly name: "move_docs";
        readonly description: {
            readonly zh: "移动文档到其他笔记本或文件夹";
            readonly en: "Move documents to another notebook or folder";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly from_paths: {
                    readonly type: "string";
                    readonly description: "源路径 JSON 数组，如 '[\"/a.sy\",\"/b.sy\"]'";
                };
                readonly to_notebook: {
                    readonly type: "string";
                    readonly description: "目标笔记本 ID";
                };
                readonly to_path: {
                    readonly type: "string";
                    readonly description: "目标路径";
                };
            };
            readonly required: readonly ["from_paths", "to_notebook", "to_path"];
        };
    };
    readonly move_docs_by_id: {
        readonly name: "move_docs_by_id";
        readonly description: {
            readonly zh: "通过 ID 移动文档到其他笔记本";
            readonly en: "Move documents by ID to another notebook";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly from_ids: {
                    readonly type: "string";
                    readonly description: "源文档 ID JSON 数组，如 '[\"xxx\",\"yyy\"]'";
                };
                readonly to_id: {
                    readonly type: "string";
                    readonly description: "目标父文档 ID 或笔记本 ID";
                };
            };
            readonly required: readonly ["from_ids", "to_id"];
        };
    };
    readonly insert_block: {
        readonly name: "insert_block";
        readonly description: {
            readonly zh: "在指定位置插入块（支持 markdown 自动识别）";
            readonly en: "Insert a block at the specified position (supports auto markdown detection)";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly dataType: {
                    readonly type: "string";
                    readonly description: "数据类型（可选，默认自动检测：markdown 或 dom）";
                };
                readonly markdown: {
                    readonly type: "string";
                    readonly description: "Markdown 内容（可选，优先级高于 data，自动设 dataType=markdown）";
                };
                readonly data: {
                    readonly type: "string";
                    readonly description: "块内容（当 markdown 未提供时使用）";
                };
                readonly parentID: {
                    readonly type: "string";
                    readonly description: "父块 ID";
                };
                readonly prevID: {
                    readonly type: "string";
                    readonly description: "前一个块 ID（可选）";
                };
            };
            readonly required: readonly ["parentID"];
        };
    };
    readonly prepend_block: {
        readonly name: "prepend_block";
        readonly description: {
            readonly zh: "在父块内最前面插入块（支持 markdown 自动识别）";
            readonly en: "Insert a block at the beginning of parent block (supports auto markdown detection)";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly dataType: {
                    readonly type: "string";
                    readonly description: "数据类型（可选，默认自动检测）";
                };
                readonly markdown: {
                    readonly type: "string";
                    readonly description: "Markdown 内容（可选，优先级高于 data）";
                };
                readonly data: {
                    readonly type: "string";
                    readonly description: "块内容";
                };
                readonly parentID: {
                    readonly type: "string";
                    readonly description: "父块 ID";
                };
            };
            readonly required: readonly ["parentID"];
        };
    };
    readonly append_block: {
        readonly name: "append_block";
        readonly description: {
            readonly zh: "在父块内最后面追加块（支持 markdown 自动识别）";
            readonly en: "Append a block at the end of parent block (supports auto markdown detection)";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly dataType: {
                    readonly type: "string";
                    readonly description: "数据类型（可选，默认自动检测）";
                };
                readonly markdown: {
                    readonly type: "string";
                    readonly description: "Markdown 内容（可选，优先级高于 data，自动设 dataType=markdown）";
                };
                readonly data: {
                    readonly type: "string";
                    readonly description: "块内容";
                };
                readonly parentID: {
                    readonly type: "string";
                    readonly description: "父块 ID";
                };
            };
            readonly required: readonly ["parentID"];
        };
    };
    readonly update_block: {
        readonly name: "update_block";
        readonly description: {
            readonly zh: "更新块内容";
            readonly en: "Update block content";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "块 ID";
                };
                readonly dataType: {
                    readonly type: "string";
                    readonly description: "数据类型";
                };
                readonly data: {
                    readonly type: "string";
                    readonly description: "新内容";
                };
            };
            readonly required: readonly ["id", "dataType", "data"];
        };
    };
    readonly delete_block: {
        readonly name: "delete_block";
        readonly description: {
            readonly zh: "删除块";
            readonly en: "Delete a block";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "块 ID";
                };
            };
            readonly required: readonly ["id"];
        };
    };
    readonly move_block: {
        readonly name: "move_block";
        readonly description: {
            readonly zh: "移动块到新位置";
            readonly en: "Move a block to a new position";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "块 ID";
                };
                readonly targetID: {
                    readonly type: "string";
                    readonly description: "目标父块 ID";
                };
                readonly targetBlockID: {
                    readonly type: "string";
                    readonly description: "目标位置参考块 ID";
                };
                readonly targetIndex: {
                    readonly type: "number";
                    readonly description: "目标索引位置";
                };
            };
            readonly required: readonly ["id", "targetID", "targetBlockID", "targetIndex"];
        };
    };
    readonly get_block_kramdown: {
        readonly name: "get_block_kramdown";
        readonly description: {
            readonly zh: "获取块的 Kramdown 源码";
            readonly en: "Get block kramdown source code";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "块或文档 ID";
                };
            };
            readonly required: readonly ["id"];
        };
    };
    readonly get_child_blocks: {
        readonly name: "get_child_blocks";
        readonly description: {
            readonly zh: "获取指定块的子块列表";
            readonly en: "Get child blocks of a specified block";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "块 ID";
                };
            };
            readonly required: readonly ["id"];
        };
    };
    readonly fold_block: {
        readonly name: "fold_block";
        readonly description: {
            readonly zh: "折叠块";
            readonly en: "Fold a block";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "块 ID";
                };
            };
            readonly required: readonly ["id"];
        };
    };
    readonly unfold_block: {
        readonly name: "unfold_block";
        readonly description: {
            readonly zh: "展开块";
            readonly en: "Unfold a block";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "块 ID";
                };
            };
            readonly required: readonly ["id"];
        };
    };
    readonly transfer_block_ref: {
        readonly name: "transfer_block_ref";
        readonly description: {
            readonly zh: "转移块引用";
            readonly en: "Transfer block reference";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly srcBlockID: {
                    readonly type: "string";
                    readonly description: "源块 ID";
                };
                readonly dstBlockID: {
                    readonly type: "string";
                    readonly description: "目标块 ID";
                };
            };
            readonly required: readonly ["srcBlockID", "dstBlockID"];
        };
    };
    readonly get_block_attrs: {
        readonly name: "get_block_attrs";
        readonly description: {
            readonly zh: "获取块属性";
            readonly en: "Get block attributes";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "块 ID";
                };
            };
            readonly required: readonly ["id"];
        };
    };
    readonly set_block_attrs: {
        readonly name: "set_block_attrs";
        readonly description: {
            readonly zh: "设置块属性";
            readonly en: "Set block attributes";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "块 ID";
                };
                readonly attrs: {
                    readonly type: "string";
                    readonly description: "属性 JSON 对象";
                };
            };
            readonly required: readonly ["id", "attrs"];
        };
    };
    readonly get_hpath_by_path: {
        readonly name: "get_hpath_by_path";
        readonly description: {
            readonly zh: "通过存储路径获取可读路径";
            readonly en: "Get human-readable path by storage path";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly notebook: {
                    readonly type: "string";
                    readonly description: "笔记本 ID";
                };
                readonly path: {
                    readonly type: "string";
                    readonly description: "存储路径";
                };
            };
            readonly required: readonly ["notebook", "path"];
        };
    };
    readonly get_hpath_by_id: {
        readonly name: "get_hpath_by_id";
        readonly description: {
            readonly zh: "通过 ID 获取可读路径";
            readonly en: "Get human-readable path by ID";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "块或文档 ID";
                };
            };
            readonly required: readonly ["id"];
        };
    };
    readonly get_path_by_id: {
        readonly name: "get_path_by_id";
        readonly description: {
            readonly zh: "通过 ID 获取存储路径";
            readonly en: "Get storage path by ID";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "块或文档 ID";
                };
            };
            readonly required: readonly ["id"];
        };
    };
    readonly get_ids_by_hpath: {
        readonly name: "get_ids_by_hpath";
        readonly description: {
            readonly zh: "通过可读路径获取 ID";
            readonly en: "Get IDs by human-readable path";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly notebook: {
                    readonly type: "string";
                    readonly description: "笔记本 ID";
                };
                readonly path: {
                    readonly type: "string";
                    readonly description: "可读路径";
                };
            };
            readonly required: readonly ["notebook", "path"];
        };
    };
    readonly sql_query: {
        readonly name: "sql_query";
        readonly description: {
            readonly zh: "执行 SQL 查询（只读，建议使用 SELECT 语句）";
            readonly en: "Execute SQL query (read-only, recommend using SELECT statements)";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly sql: {
                    readonly type: "string";
                    readonly description: "SQL 查询语句";
                };
            };
            readonly required: readonly ["sql"];
        };
    };
    readonly flush_transaction: {
        readonly name: "flush_transaction";
        readonly description: {
            readonly zh: "提交所有挂起的事务";
            readonly en: "Flush all pending transactions";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {};
        };
    };
    readonly get_file: {
        readonly name: "get_file";
        readonly description: {
            readonly zh: "读取文件内容";
            readonly en: "Read file content";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly path: {
                    readonly type: "string";
                    readonly description: "文件路径";
                };
            };
            readonly required: readonly ["path"];
        };
    };
    readonly put_file: {
        readonly name: "put_file";
        readonly description: {
            readonly zh: "写入文件内容";
            readonly en: "Write file content";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly path: {
                    readonly type: "string";
                    readonly description: "文件路径";
                };
                readonly file: {
                    readonly type: "string";
                    readonly description: "文件内容（Base64 或纯文本）";
                };
            };
            readonly required: readonly ["path", "file"];
        };
    };
    readonly remove_file: {
        readonly name: "remove_file";
        readonly description: {
            readonly zh: "删除文件（谨慎操作）";
            readonly en: "Remove a file (use with caution)";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly path: {
                    readonly type: "string";
                    readonly description: "文件路径";
                };
            };
            readonly required: readonly ["path"];
        };
    };
    readonly rename_file: {
        readonly name: "rename_file";
        readonly description: {
            readonly zh: "重命名文件";
            readonly en: "Rename a file";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly path: {
                    readonly type: "string";
                    readonly description: "当前文件路径";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "新文件名";
                };
            };
            readonly required: readonly ["path", "name"];
        };
    };
    readonly read_dir: {
        readonly name: "read_dir";
        readonly description: {
            readonly zh: "列出目录中的文件";
            readonly en: "List files in a directory";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly path: {
                    readonly type: "string";
                    readonly description: "目录路径";
                };
                readonly start: {
                    readonly type: "number";
                    readonly description: "起始偏移";
                };
                readonly limit: {
                    readonly type: "number";
                    readonly description: "返回数量限制";
                };
            };
        };
    };
    readonly export_md_content: {
        readonly name: "export_md_content";
        readonly description: {
            readonly zh: "导文档为 Markdown 文本";
            readonly en: "Export document as Markdown text";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "文档 ID";
                };
            };
            readonly required: readonly ["id"];
        };
    };
    readonly export_resources: {
        readonly name: "export_resources";
        readonly description: {
            readonly zh: "导出文档使用的资源文件";
            readonly en: "Export resource files used by a document";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "文档 ID";
                };
                readonly path: {
                    readonly type: "string";
                    readonly description: "导出目标路径";
                };
            };
            readonly required: readonly ["id", "path"];
        };
    };
    readonly pandoc_convert: {
        readonly name: "pandoc_convert";
        readonly description: {
            readonly zh: "使用 Pandoc 转换文档格式";
            readonly en: "Convert document format using Pandoc";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "文档 ID";
                };
                readonly from: {
                    readonly type: "string";
                    readonly description: "源格式";
                };
                readonly to: {
                    readonly type: "string";
                    readonly description: "目标格式";
                };
            };
            readonly required: readonly ["id", "from", "to"];
        };
    };
    readonly render_template: {
        readonly name: "render_template";
        readonly description: {
            readonly zh: "渲染思源模板";
            readonly en: "Render SiYuan template";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly description: "文档 ID";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "模板名称";
                };
            };
            readonly required: readonly ["id", "name"];
        };
    };
    readonly render_sprig: {
        readonly name: "render_sprig";
        readonly description: {
            readonly zh: "渲染 Sprig 模板函数";
            readonly en: "Render Sprig template function";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: "string";
                    readonly description: "模板函数名称";
                };
            };
            readonly required: readonly ["name"];
        };
    };
    readonly upload_asset: {
        readonly name: "upload_asset";
        readonly description: {
            readonly zh: "上传资源文件到思源笔记";
            readonly en: "Upload asset file to SiYuan Note";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly fileName: {
                    readonly type: "string";
                    readonly description: "文件名";
                };
                readonly isRemote: {
                    readonly type: "boolean";
                    readonly description: "是否远程文件";
                };
            };
            readonly required: readonly ["fileName"];
        };
    };
    readonly get_version: {
        readonly name: "get_version";
        readonly description: {
            readonly zh: "获取思源笔记版本";
            readonly en: "Get SiYuan Note version";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {};
        };
    };
    readonly get_current_time: {
        readonly name: "get_current_time";
        readonly description: {
            readonly zh: "获取系统当前时间";
            readonly en: "Get system current time";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {};
        };
    };
    readonly get_boot_progress: {
        readonly name: "get_boot_progress";
        readonly description: {
            readonly zh: "获取思源笔记启动进度";
            readonly en: "Get SiYuan Note boot progress";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {};
        };
    };
    readonly check_siyuan_status: {
        readonly name: "check_siyuan_status";
        readonly description: {
            readonly zh: "检查思源笔记连接状态和 API 可用性";
            readonly en: "Check SiYuan Note connection status and API availability";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {};
        };
    };
    readonly get_workspace_info: {
        readonly name: "get_workspace_info";
        readonly description: {
            readonly zh: "获取工作空间和连接信息";
            readonly en: "Get workspace and connection information";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {};
        };
    };
    readonly push_msg: {
        readonly name: "push_msg";
        readonly description: {
            readonly zh: "推送通知消息";
            readonly en: "Push notification message";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly msg: {
                    readonly type: "string";
                    readonly description: "消息内容";
                };
                readonly channel: {
                    readonly type: "string";
                    readonly description: "消息频道（info/success/warning/error）";
                };
            };
            readonly required: readonly ["msg"];
        };
    };
    readonly push_err_msg: {
        readonly name: "push_err_msg";
        readonly description: {
            readonly zh: "推送错误消息通知";
            readonly en: "Push error message notification";
        };
        readonly inputSchema: {
            readonly type: "object";
            readonly properties: {
                readonly msg: {
                    readonly type: "string";
                    readonly description: "错误消息内容";
                };
            };
            readonly required: readonly ["msg"];
        };
    };
};
export type ToolName = keyof typeof toolSchemas;
//# sourceMappingURL=index.d.ts.map