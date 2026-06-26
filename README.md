# mcp-alphafold

AlphaFold DB MCP — predicted protein structures.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 965+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `prediction` | Full prediction metadata + structure file URLs (PDB, CIF, PAE). |
| `summary` | Short summary for a prediction (organism, sequence, mean pLDDT). |
| `annotations` | Sequence-level annotations (e.g. MUTAGEN, LOW_CONFIDENCE_REGIONS). |
| `uniprot` | Fetch AlphaFold structure prediction metadata (PDB/CIF/PAE download URLs, pLDDT scores) by UniProt accession (e.g. "P00533"); equivalent to `prediction` but takes uniprot_id explicitly. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "alphafold": {
      "url": "https://gateway.pipeworx.io/alphafold/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 965+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Alphafold data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
