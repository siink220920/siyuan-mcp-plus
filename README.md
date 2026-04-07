# Siyuan MCP Plus / 思源笔记 MCP 增强版

[English](#english) | [中文](#中文)

---

## English

### Overview

`siyuan-mcp-plus` is an enhanced MCP (Model Context Protocol) server for SiYuan Note, providing complete SiYuan API functionality with cloud support, improved error handling, and cleaner output.

### Features

- **Complete SiYuan API Coverage** - 46 tools covering notebooks, documents, blocks, SQL, files, templates, and more
- **Cloud Native Support** - Full support for SiYuan Cloud (`note.uuxj.com`) and self-hosted instances
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
SIYUAN_URL=https://note.uuxj.com SIYUAN_TOKEN=your_token siyuan-mcp-plus
```

**For Local Instance / 本地实例配置:**

```bash
SIYUAN_TOKEN=your_local_token siyuan-mcp-plus
```

### Tools Overview (46 tools)

| Category | Tools |
|----------|-------|
| Notebook / 笔记本管理 | list_notebooks, open_notebook, close_notebook, create_notebook, remove_notebook, rename_notebook, get_notebook_conf, set_notebook_conf |
| Document / 文档管理 | create_doc, rename_doc, rename_doc_by_id, remove_doc, remove_doc_by_id, move_docs, move_docs_by_id |
| Block / 块级操作 | insert_block, prepend_block, append_block, update_block, delete_block, move_block, get_block_kramdown, get_child_blocks, fold_block, unfold_block, transfer_block_ref |
| Attribute / 属性管理 | get_block_attrs, set_block_attrs |
| Path / 路径查询 | get_hpath_by_path, get_hpath_by_id, get_path_by_id, get_ids_by_hpath |
| SQL / 数据库查询 | sql_query, flush_transaction |
| File / 文件操作 | get_file, put_file, remove_file, rename_file, read_dir |
| Export / 导出 | export_md_content, export_resources, pandoc_convert |
| Template / 模板 | render_template, render_sprig |
| Asset / 资源 | upload_asset |
| System / 系统 | get_version, get_current_time, get_boot_progress, check_siyuan_status, get_workspace_info, push_msg, push_err_msg |

### MCP Configuration Example

**mcporter:**

```json
{
  "mcpServers": {
    "siyuan": {
      "command": "siyuan-mcp-plus",
      "env": {
        "SIYUAN_URL": "https://note.uuxj.com",
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
      "SIYUAN_URL": "https://note.uuxj.com",
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
- **云端原生支持** - 完美支持思源云（`note.uuxj.com`）和自托管实例
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
SIYUAN_URL=https://note.uuxj.com SIYUAN_TOKEN=你的令牌 siyuan-mcp-plus
```

**本地实例配置：**

```bash
SIYUAN_TOKEN=你的本地令牌 siyuan-mcp-plus
```

### 工具概览（46 个工具）

| 分类 | 工具 |
|------|------|
| 笔记本管理 | list_notebooks, open_notebook, close_notebook, create_notebook, remove_notebook, rename_notebook, get_notebook_conf, set_notebook_conf |
| 文档管理 | create_doc, rename_doc, rename_doc_by_id, remove_doc, remove_doc_by_id, move_docs, move_docs_by_id |
| 块级操作 | insert_block, prepend_block, append_block, update_block, delete_block, move_block, get_block_kramdown, get_child_blocks, fold_block, unfold_block, transfer_block_ref |
| 属性管理 | get_block_attrs, set_block_attrs |
| 路径查询 | get_hpath_by_path, get_hpath_by_id, get_path_by_id, get_ids_by_hpath |
| 数据库查询 | sql_query, flush_transaction |
| 文件操作 | get_file, put_file, remove_file, rename_file, read_dir |
| 导出 | export_md_content, export_resources, pandoc_convert |
| 模板 | render_template, render_sprig |
| 资源 | upload_asset |
| 系统 | get_version, get_current_time, get_boot_progress, check_siyuan_status, get_workspace_info, push_msg, push_err_msg |

### MCP 配置示例

**mcporter:**

```json
{
  "mcpServers": {
    "siyuan": {
      "command": "siyuan-mcp-plus",
      "env": {
        "SIYUAN_URL": "https://note.uuxj.com",
        "SIYUAN_TOKEN": "你的令牌"
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
      "SIYUAN_URL": "https://note.uuxj.com",
      "SIYUAN_TOKEN": "你的令牌"
    }
  }
}
```

### 笔记本图标格式

设置笔记本图标时，使用 Unicode 码点字符串（而非 emoji 字符）：

| 图标 | 码点 |
|------|------|
| 🔧 | `1f527` |
| 🔑 | `1f511` |
| 📚 | `1f4da` |
| 🖥 | `1f5a5` |
| 🛠 | `1f6e0` |
| 📝 | `1f4dd` |
| 📖 | `1f4d6` |

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
