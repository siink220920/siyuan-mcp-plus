#!/usr/bin/env node
/**
 * SiYuan MCP Server Plus - Main Entry
 * 思源笔记 MCP 服务增强版 - 主入口
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { SiyuanApi, SiyuanApiError } from './api/siyuan.js';
import { toolSchemas } from './tools/index.js';
// ==================== Server Setup / 服务器初始化 ====================
const SIYUAN_URL = process.env.SIYUAN_URL || process.env.SIYUAN_HOST || 'http://127.0.0.1:6806';
const SIYUAN_TOKEN = process.env.SIYUAN_TOKEN || '';
// ==================== Environment Validation / 环境变量验证 ====================
if (!SIYUAN_TOKEN) {
    process.stderr.write('[siyuan-mcp-plus] Error: SIYUAN_TOKEN environment variable is required\n');
    process.exit(1);
}
const URL_PARSED = new URL(SIYUAN_URL);
if (!['http:', 'https:'].includes(URL_PARSED.protocol)) {
    process.stderr.write('[siyuan-mcp-plus] Error: SIYUAN_URL must use http or https protocol\n');
    process.exit(1);
}
const server = new Server({
    name: 'siyuan-mcp-plus',
    version: '1.0.0',
}, {
    capabilities: {
        tools: {},
        resources: {},
    },
});
// Initialize API client / 初始化 API 客户端
const api = new SiyuanApi({ url: SIYUAN_URL, token: SIYUAN_TOKEN });
// ==================== Tool Handlers / 工具处理器 ====================
async function handleTool(name, args) {
    try {
        switch (name) {
            // ==================== Notebook / 笔记本 ====================
            case 'list_notebooks': {
                const result = await api.listNotebooks();
                const text = result.notebooks.map(n => `[${n.id}] ${n.name} ${n.icon ? `(icon: ${n.icon})` : ''} ${n.closed ? '(closed)' : ''}`).join('\n');
                return { content: [{ type: 'text', text: `Notebooks (${result.notebooks.length}):\n${text}` }] };
            }
            case 'open_notebook': {
                await api.openNotebook(args.notebook);
                return { content: [{ type: 'text', text: `Notebook ${args.notebook} opened successfully` }] };
            }
            case 'close_notebook': {
                await api.closeNotebook(args.notebook);
                return { content: [{ type: 'text', text: `Notebook ${args.notebook} closed successfully` }] };
            }
            case 'create_notebook': {
                const result = await api.createNotebook(args.name);
                return { content: [{ type: 'text', text: `Notebook created: ${result.notebook?.id || result}` }] };
            }
            case 'remove_notebook': {
                await api.removeNotebook(args.notebook);
                return { content: [{ type: 'text', text: `Notebook ${args.notebook} removed successfully` }] };
            }
            case 'rename_notebook': {
                await api.renameNotebook(args.notebook, args.name);
                return { content: [{ type: 'text', text: `Notebook renamed to "${args.name}"` }] };
            }
            case 'get_notebook_conf': {
                const conf = await api.getNotebookConf(args.notebook);
                return { content: [{ type: 'text', text: JSON.stringify(conf, null, 2) }] };
            }
            case 'set_notebook_conf': {
                const confObj = typeof args.conf === 'string' ? JSON.parse(args.conf) : args.conf;
                await api.setNotebookConf(args.notebook, confObj);
                return { content: [{ type: 'text', text: 'Notebook configuration saved successfully' }] };
            }
            // ==================== Document / 文档 ====================
            case 'create_doc': {
                // Ensure path does not end with .md
                const cleanPath = args.path.replace(/\.md$/, '');
                const result = await api.createDocWithMd(args.notebook, cleanPath, args.markdown || '');
                return { content: [{ type: 'text', text: `Document created: ${result}` }] };
            }
            case 'rename_doc': {
                await api.renameDoc(args.notebook, args.path, args.title);
                return { content: [{ type: 'text', text: `Document renamed to "${args.title}"` }] };
            }
            case 'rename_doc_by_id': {
                await api.renameDocById(args.id, args.title);
                return { content: [{ type: 'text', text: `Document renamed to "${args.title}"` }] };
            }
            case 'remove_doc': {
                await api.removeDoc(args.notebook, args.path);
                return { content: [{ type: 'text', text: `Document removed: ${args.path}` }] };
            }
            case 'remove_doc_by_id': {
                // 需要 notebook 参数
                let notebook = args.notebook;
                if (!notebook) {
                    // 尝试通过 getPathById 获取
                    const pathInfo = await api.getPathById(args.id);
                    notebook = pathInfo?.notebook;
                }
                if (!notebook) {
                    return { content: [{ type: 'text', text: `Error: notebook required for remove_doc_by_id. Provide it explicitly or use getPathById first.` }] };
                }
                await api.removeDocById(args.id, notebook);
                await api.flushTransaction();
                return { content: [{ type: 'text', text: `Document removed: ${args.id} from ${notebook}` }] };
            }
            case 'move_docs': {
                const fromPaths = typeof args.from_paths === 'string' ? JSON.parse(args.from_paths) : args.from_paths;
                await api.moveDocs(fromPaths, args.to_notebook, args.to_path);
                return { content: [{ type: 'text', text: `Documents moved to ${args.to_notebook}/${args.to_path}` }] };
            }
            case 'move_docs_by_id': {
                const fromIds = typeof args.from_ids === 'string' ? JSON.parse(args.from_ids) : args.from_ids;
                await api.moveDocsById(fromIds, args.to_id);
                return { content: [{ type: 'text', text: `Documents moved to ${args.to_id}` }] };
            }
            // ==================== Block / 块 ====================
            case 'insert_block': {
                const dataType = args.dataType || (args.markdown ? 'markdown' : 'dom');
                const data = args.markdown || args.data;
                const result = await api.insertBlock(dataType, data, args.parentID, args.prevID);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'prepend_block': {
                const dataType = args.dataType || (args.markdown ? 'markdown' : 'dom');
                const data = args.markdown || args.data;
                const result = await api.prependBlock(dataType, data, args.parentID);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'append_block': {
                const dataType = args.dataType || (args.markdown ? 'markdown' : 'dom');
                const data = args.markdown || args.data;
                const result = await api.appendBlock(dataType, data, args.parentID);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'update_block': {
                const result = await api.updateBlock(args.id, args.dataType, args.data);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'delete_block': {
                await api.deleteBlock(args.id);
                return { content: [{ type: 'text', text: `Block ${args.id} deleted` }] };
            }
            case 'move_block': {
                await api.moveBlock(args.id, args.targetID, args.targetBlockID, args.targetIndex);
                return { content: [{ type: 'text', text: `Block ${args.id} moved` }] };
            }
            case 'get_block_kramdown': {
                const result = await api.getBlockKramdown(args.id);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'get_child_blocks': {
                const result = await api.getChildBlocks(args.id);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'fold_block': {
                await api.foldBlock(args.id);
                return { content: [{ type: 'text', text: `Block ${args.id} folded` }] };
            }
            case 'unfold_block': {
                await api.unfoldBlock(args.id);
                return { content: [{ type: 'text', text: `Block ${args.id} unfolded` }] };
            }
            case 'transfer_block_ref': {
                await api.transferBlockRef(args.srcBlockID, args.dstBlockID);
                return { content: [{ type: 'text', text: `Block ref transferred from ${args.srcBlockID} to ${args.dstBlockID}` }] };
            }
            // ==================== Attributes / 属性 ====================
            case 'get_block_attrs': {
                const result = await api.getBlockAttrs(args.id);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'set_block_attrs': {
                const attrs = typeof args.attrs === 'string' ? JSON.parse(args.attrs) : args.attrs;
                await api.setBlockAttrs(args.id, attrs);
                return { content: [{ type: 'text', text: `Block ${args.id} attributes updated` }] };
            }
            // ==================== Path / 路径 ====================
            case 'get_hpath_by_path': {
                const result = await api.getHPathByPath(args.notebook, args.path);
                return { content: [{ type: 'text', text: String(result) }] };
            }
            case 'get_hpath_by_id': {
                const result = await api.getHPathById(args.id);
                return { content: [{ type: 'text', text: String(result) }] };
            }
            case 'get_path_by_id': {
                const result = await api.getPathById(args.id);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'get_ids_by_hpath': {
                const result = await api.getIDsByHPath(args.notebook, args.path);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            // ==================== SQL / 数据库 ====================
            case 'sql_query': {
                const result = await api.sqlQuery(args.sql);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'flush_transaction': {
                await api.flushTransaction();
                return { content: [{ type: 'text', text: 'Transaction flushed' }] };
            }
            // ==================== File / 文件 ====================
            case 'get_file': {
                const result = await api.getFile(args.path);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'put_file': {
                await api.putFile(args.path, args.file);
                return { content: [{ type: 'text', text: `File written: ${args.path}` }] };
            }
            case 'remove_file': {
                await api.removeFile(args.path);
                return { content: [{ type: 'text', text: `File removed: ${args.path}` }] };
            }
            case 'rename_file': {
                await api.renameFile(args.path, args.name);
                return { content: [{ type: 'text', text: `File renamed to ${args.name}` }] };
            }
            case 'read_dir': {
                const result = await api.readDir(args.path, args.start, args.limit);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            // ==================== Export / 导出 ====================
            case 'export_md_content': {
                const result = await api.exportMdContent(args.id);
                return { content: [{ type: 'text', text: String(result) }] };
            }
            case 'export_resources': {
                await api.exportResources(args.id, args.path);
                return { content: [{ type: 'text', text: `Resources exported to ${args.path}` }] };
            }
            case 'pandoc_convert': {
                const result = await api.pandocConvert(args.id, args.from, args.to);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            // ==================== Template / 模板 ====================
            case 'render_template': {
                const result = await api.renderTemplate(args.id, args.name);
                return { content: [{ type: 'text', text: String(result) }] };
            }
            case 'render_sprig': {
                const result = await api.renderSprig(args.name, args);
                return { content: [{ type: 'text', text: String(result) }] };
            }
            // ==================== Asset / 资源 ====================
            case 'upload_asset': {
                const result = await api.uploadAsset(args.fileName, args.isRemote);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            // ==================== System / 系统 ====================
            case 'get_version': {
                const result = await api.getVersion();
                return { content: [{ type: 'text', text: `SiYuan version: ${result}` }] };
            }
            case 'get_current_time': {
                const result = await api.getCurrentTime();
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'get_boot_progress': {
                const result = await api.getBootProgress();
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            case 'check_siyuan_status': {
                const errors = [];
                let version = null;
                let notebooks = null;
                let sqlTest = null;
                try {
                    version = await api.getVersion();
                }
                catch {
                    errors.push('System version API failed');
                }
                try {
                    notebooks = await api.listNotebooks();
                }
                catch {
                    errors.push('Notebook list API failed');
                }
                try {
                    sqlTest = await api.sqlQuery('SELECT 1');
                }
                catch {
                    errors.push('SQL query API failed');
                }
                const status = [];
                if (version)
                    status.push('✅ System version API');
                if (sqlTest)
                    status.push('✅ SQL query API');
                if (notebooks)
                    status.push(`✅ Notebook list API (${notebooks.length} notebooks)`);
                if (errors.length > 0) {
                    status.push('');
                    status.push('❌ Failures:');
                    errors.forEach(e => status.push(`  - ${e}`));
                }
                return {
                    content: [{
                            type: 'text',
                            text: `SiYuan Status Check:\n\n${status.join('\n')}\n\nConnection URL: ${SIYUAN_URL}`
                        }]
                };
            }
            case 'get_workspace_info': {
                return {
                    content: [{
                            type: 'text',
                            text: JSON.stringify({
                                connection: {
                                    url: SIYUAN_URL,
                                    hasToken: !!SIYUAN_TOKEN,
                                    tokenPrefix: SIYUAN_TOKEN ? `${SIYUAN_TOKEN.substring(0, 8)}...` : 'Not set',
                                },
                                environment: {
                                    nodeVersion: process.version,
                                    platform: process.platform,
                                },
                                mcpServer: {
                                    name: 'siyuan-mcp-plus',
                                    version: '1.0.0',
                                },
                            }, null, 2),
                        }]
                };
            }
            case 'push_msg': {
                await api.pushMsg(args.msg, args.channel);
                return { content: [{ type: 'text', text: `Message pushed: ${args.msg}` }] };
            }
            case 'push_err_msg': {
                await api.pushErrMsg(args.msg);
                return { content: [{ type: 'text', text: `Error message pushed: ${args.msg}` }] };
            }
            default:
                return { content: [{ type: 'text', text: `Unknown tool: ${name}` }] };
        }
    }
    catch (err) {
        if (err instanceof SiyuanApiError) {
            return {
                content: [{
                        type: 'text',
                        text: `SiYuan API Error (${err.code}) at ${err.endpoint}: ${err.message}`,
                    }],
            };
        }
        return {
            content: [{
                    type: 'text',
                    text: `Error: ${err instanceof Error ? err.message : String(err)}`,
                }],
        };
    }
}
// ==================== Request Handlers / 请求处理器 ====================
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: Object.entries(toolSchemas).map(([name, schema]) => ({
            name: schema.name,
            description: typeof schema.description === 'object'
                ? schema.description.zh // default to Chinese
                : schema.description,
            inputSchema: schema.inputSchema,
        })),
    };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const result = await handleTool(name, args || {});
    return result;
});
// ==================== Start Server / 启动服务 ====================
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main().catch((err) => {
    process.stderr.write(`Fatal error: ${err.message}\n`);
    process.exit(1);
});
//# sourceMappingURL=index.js.map