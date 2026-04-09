# Siyuan MCP Plus / 思源笔记 MCP 增强版

[English](#english) | [中文](#中文)

---

## English

### Overview

`siyuan-mcp-plus` is an enhanced MCP (Model Context Protocol) server for SiYuan Note, providing complete SiYuan API functionality with cloud support, improved error handling, and cleaner output.

### Features

- **Complete SiYuan API Coverage** - 52 tools covering notebooks, documents, blocks, SQL, files, templates, and more
- **Cloud Native Support** - Full support for SiYuan Cloud (`your-cloud.com`) and self-hosted instances
- **Clean JSON-RPC Output** - No debug logs contaminating stdout, production-ready
- **Structured Error Handling** - Clear error messages with API codes and endpoints
- **Bilingual Documentation** - All tool descriptions in Chinese and English
- **Path Normalization** - Automatic `.md` suffix handling for document paths
- **Icon Support** - Full support for notebook emoji icons via Unicode code points

### Installation

```bash
npm install -g siyuan-mcp-plus
```

Or use with npx:

```bash
npx siyuan-mcp-plus
```

### Configuration

**Environment Variables:**

| Variable | Default | Description |
|----------|---------|-------------|
| `SIYUAN_URL` | `http://127.0.0.1:6806` | SiYuan API URL |
| `SIYUAN_TOKEN` | (empty) | API Token |

**For SiYuan Cloud / 思源云配置:**

```bash
SIYUAN_URL=https://your-cloud.com SIYUAN_TOKEN=your_token siyuan-mcp-plus
```

**For Local Instance / 本地实例配置:**

```bash
SIYUAN_TOKEN=your_local_token siyuan-mcp-plus
```


### API Endpoint Notes

This server uses the **official SiYuan API** endpoints. Reference: [SiYuan Official API](https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md).

Some common mistakes in third-party implementations are corrected here:

| Category | Wrong (Common Mistake) | Correct (Official) |
|----------|----------------------|-------------------|
| Block Attributes | `/api/filetree/getBlockAttrs` | `/api/attr/getBlockAttrs` |
| Block Attributes | `/api/filetree/setBlockAttrs` | `/api/attr/setBlockAttrs` |
| Notifications | `/api/notify/pushMsg` | `/api/notification/pushMsg` |
| Notifications | `/api/notify/pushErrMsg` | `/api/notification/pushErrMsg` |
| Template | `/api/template/renderTemplate` | `/api/template/render` |
| Pandoc Export | `/api/export/pandocConvert` | `/api/convert/pandoc` |
| System | `/api/system/getBootProgress` | `/api/system/bootProgress` |
| File | `/api/file森林公园/*` | `/api/file/*` |

All other endpoints follow the official API specification exactly.

### Tools Overview (52 tools)

| Tool | Description |
|------|-------------|
| **Notebook / 笔记本管理** | |
| `list_notebooks` | List all notebooks, returns notebook ID, name, icon and other information |
| `open_notebook` | Open a specified notebook to make it accessible |
| `close_notebook` | Close a specified notebook |
| `create_notebook` | Create a new notebook |
| `remove_notebook` | Remove a notebook (use with caution) |
| `rename_notebook` | Rename a notebook |
| `get_notebook_conf` | Get notebook configuration (includes icon, etc.) |
| `set_notebook_conf` | Save notebook configuration (can set icon, use Unicode code point string like "1f527") |
| **Document / 文档管理** | |
| `create_doc` | Create a new document in the specified notebook with Markdown content. Path should not include .md suffix |
| `rename_doc` | Rename a document by path |
| `rename_doc_by_id` | Rename a document by its ID |
| `remove_doc` | Remove a document by path (use with caution) |
| `remove_doc_by_id` | Remove a document by ID (permanent deletion, cannot be recovered, use with caution) |
| `move_docs` | Move documents to another notebook or folder |
| `move_docs_by_id` | Move documents by ID to another notebook |
| **Block / 块级操作** | |
| `insert_block` | Insert a block at the specified position |
| `prepend_block` | Insert a block at the beginning of parent block |
| `append_block` | Append a block at the end of parent block |
| `update_block` | Update block content |
| `delete_block` | Delete a block |
| `move_block` | Move a block to a new position |
| `get_block_kramdown` | Get block kramdown source code |
| `get_child_blocks` | Get child blocks of a specified block |
| `fold_block` | Fold a block |
| `unfold_block` | Unfold a block |
| `transfer_block_ref` | Transfer block reference |
| **Attribute / 属性管理** | |
| `get_block_attrs` | Get block attributes |
| `set_block_attrs` | Set block attributes |
| **Path / 路径查询** | |
| `get_hpath_by_path` | Get human-readable path by storage path |
| `get_hpath_by_id` | Get human-readable path by ID |
| `get_path_by_id` | Get storage path by ID |
| `get_ids_by_hpath` | Get IDs by human-readable path |
| **SQL / 数据库查询** | |
| `sql_query` | Execute SQL query (read-only, recommend using SELECT statements) |
| `flush_transaction` | Flush all pending transactions |
| **File / 文件操作** | |
| `get_file` | Read file content |
| `put_file` | Write file content |
| `remove_file` | Remove a file (use with caution) |
| `rename_file` | Rename a file |
| `read_dir` | List files in a directory |
| **Export / 导出** | |
| `export_md_content` | Export document as Markdown text |
| `export_resources` | Export resource files used by a document |
| `pandoc_convert` | Convert document format using Pandoc |
| **Template / 模板** | |
| `render_template` | Render SiYuan template |
| `render_sprig` | Render Sprig template function |
| **Asset / 资源** | |
| `upload_asset` | Upload asset file to SiYuan Note |
| **System / 系统** | |
| `get_version` | Get SiYuan Note version |
| `get_current_time` | Get system current time |
| `get_boot_progress` | Get SiYuan Note boot progress |
| `check_siyuan_status` | Check SiYuan Note connection status and API availability |
| `get_workspace_info` | Get workspace and connection information |
| `push_msg` | Push notification message |
| `push_err_msg` | Push error message notification |

### MCP Configuration Example

**mcporter:**

```json
{
  "mcpServers": {
    "siyuan": {
      "command": "siyuan-mcp-plus",
      "env": {
        "SIYUAN_URL": "https://your-cloud.com",
        "SIYUAN_TOKEN": "your_token_here"
      }
    }
  }
}
```

**OpenClaw:**

```json
{
  "siyuan": {
    "command": "npx",
    "args": ["-y", "siyuan-mcp-plus"],
    "env": {
      "SIYUAN_URL": "https://your-cloud.com",
      "SIYUAN_TOKEN": "your_token_here"
    }
  }
}
```

### Notebook Icon Format

To set notebook icons, use Unicode code point strings (not emoji characters):

| Icon | Code Point |
|------|-----------|
| 🔧 | `1f527` |
| 🔑 | `1f511` |
| 📚 | `1f4da` |
| 🖥 | `1f5a5` |
| 🛠 | `1f6e0` |
| 📝 | `1f4dd` |
| 📖 | `1f4d6` |

### Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run in development mode
npm run dev

# Run in development with npx
npx tsx src/index.ts
```

### License

MIT

---

## 中文

### 概述

`siyuan-mcp-plus` 是思源笔记的增强版 MCP（Model Context Protocol）服务器，提供完整的思源 API 功能，支持云端、优化错误处理、干净的输出格式。

### 特性

- **完整 API 覆盖** - 46 个工具，覆盖笔记本、文档、块、SQL、文件、模板等
- **云端原生支持** - 完美支持思源云（`your-cloud.com`）和自托管实例
- **干净的 JSON-RPC 输出** - 无调试日志污染 stdout，生产环境可用
- **结构化错误处理** - 清晰的错误信息，包含 API 状态码和端点
- **双语文档** - 所有工具描述均有中英文
- **路径规范化** - 自动处理文档路径的 `.md` 后缀
- **图标支持** - 支持通过 Unicode 码点设置笔记本 emoji 图标

### 安装

```bash
npm install -g siyuan-mcp-plus
```

或使用 npx 直接运行：

```bash
npx siyuan-mcp-plus
```

### 配置

**环境变量：**

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `SIYUAN_URL` | `http://127.0.0.1:6806` | 思源 API 地址 |
| `SIYUAN_TOKEN` | (空) | API 令牌 |

**思源云配置：**

```bash
SIYUAN_URL=https://your-cloud.com SIYUAN_TOKEN=你的令牌 siyuan-mcp-plus
```

**本地实例配置：**

```bash
SIYUAN_TOKEN=你的本地令牌 siyuan-mcp-plus
```


### API 端点说明

本服务使用**官方思源 API** 端点。参考：[思源官方 API 文档](https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md)。

已修正第三方实现中的常见错误：

| 类别 | 错误（常见错误） | 正确（官方） |
|------|----------------|------------|
| 块属性 | `/api/filetree/getBlockAttrs` | `/api/attr/getBlockAttrs` |
| 块属性 | `/api/filetree/setBlockAttrs` | `/api/attr/setBlockAttrs` |
| 通知 | `/api/notify/pushMsg` | `/api/notification/pushMsg` |
| 通知 | `/api/notify/pushErrMsg` | `/api/notification/pushErrMsg` |
| 模板 | `/api/template/renderTemplate` | `/api/template/render` |
| Pandoc 导出 | `/api/export/pandocConvert` | `/api/convert/pandoc` |
| 系统 | `/api/system/getBootProgress` | `/api/system/bootProgress` |
| 文件 | `/api/file森林公园/*` | `/api/file/*` |

其他所有端点均严格遵循官方 API 规范。

### 工具概览（52 个工具）

| 工具 | 描述 |
|------|------|
| **Notebook / 笔记本管理** | |
| `list_notebooks` | 列出所有笔记本，返回笔记本 ID、名称、图标等信息 |
| `open_notebook` | 打开指定笔记本，使其可以被访问 |
| `close_notebook` | 关闭指定笔记本 |
| `create_notebook` | 创建新笔记本 |
| `remove_notebook` | 删除笔记本（谨慎操作） |
| `rename_notebook` | 重命名笔记本 |
| `get_notebook_conf` | 获取笔记本配置（包含图标等） |
| `set_notebook_conf` | 保存笔记本配置（可设置图标，图标使用 Unicode 码点字符串如 "1f527"） |
| **Document / 文档管理** | |
| `create_doc` | 在指定笔记本中创建新文档，支持 Markdown 内容。路径不要包含 .md 后缀 |
| `rename_doc` | 通过路径重命名文档 |
| `rename_doc_by_id` | 通过文档 ID 重命名文档 |
| `remove_doc` | 通过路径删除文档（谨慎操作） |
| `remove_doc_by_id` | 通过文档 ID 删除文档（彻底删除，无法恢复，谨慎操作） |
| `move_docs` | 移动文档到其他笔记本或文件夹 |
| `move_docs_by_id` | 通过 ID 移动文档到其他笔记本 |
| **Block / 块级操作** | |
| `insert_block` | 在指定位置插入块 |
| `prepend_block` | 在父块内最前面插入块 |
| `append_block` | 在父块内最后面追加块 |
| `update_block` | 更新块内容 |
| `delete_block` | 删除块 |
| `move_block` | 移动块到新位置 |
| `get_block_kramdown` | 获取块的 Kramdown 源码 |
| `get_child_blocks` | 获取指定块的子块列表 |
| `fold_block` | 折叠块 |
| `unfold_block` | 展开块 |
| `transfer_block_ref` | 转移块引用 |
| **Attribute / 属性管理** | |
| `get_block_attrs` | 获取块属性 |
| `set_block_attrs` | 设置块属性 |
| **Path / 路径查询** | |
| `get_hpath_by_path` | 通过存储路径获取可读路径 |
| `get_hpath_by_id` | 通过 ID 获取可读路径 |
| `get_path_by_id` | 通过 ID 获取存储路径 |
| `get_ids_by_hpath` | 通过可读路径获取 ID |
| **SQL / 数据库查询** | |
| `sql_query` | 执行 SQL 查询（只读，建议使用 SELECT 语句） |
| `flush_transaction` | 提交所有挂起的事务 |
| **File / 文件操作** | |
| `get_file` | 读取文件内容 |
| `put_file` | 写入文件内容 |
| `remove_file` | 删除文件（谨慎操作） |
| `rename_file` | 重命名文件 |
| `read_dir` | 列出目录中的文件 |
| **Export / 导出** | |
| `export_md_content` | 导文档为 Markdown 文本 |
| `export_resources` | 导出文档使用的资源文件 |
| `pandoc_convert` | 使用 Pandoc 转换文档格式 |
| **Template / 模板** | |
| `render_template` | 渲染思源模板 |
| `render_sprig` | 渲染 Sprig 模板函数 |
| **Asset / 资源** | |
| `upload_asset` | 上传资源文件到思源笔记 |
| **System / 系统** | |
| `get_version` | 获取思源笔记版本 |
| `get_current_time` | 获取系统当前时间 |
| `get_boot_progress` | 获取思源笔记启动进度 |
| `check_siyuan_status` | 检查思源笔记连接状态和 API 可用性 |
| `get_workspace_info` | 获取工作空间和连接信息 |
| `push_msg` | 推送通知消息 |
| `push_err_msg` | 推送错误消息通知 |

### 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 开发模式运行
npm run dev

# 使用 npx tsx 运行
npx tsx src/index.ts
```

### 许可证

MIT
