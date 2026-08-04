# @pipeworx/alphafold

EBI [AlphaFold Protein Structure Database](https://alphafold.ebi.ac.uk/) MCP — predicted 3-D protein structures for ~214 M sequences. Keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `prediction(qualifier)` — full prediction metadata + file URLs (PDB, CIF, PAE)
- `summary(qualifier)` — short structure summary
- `annotations(qualifier, type?)` — sequence-level annotations (regions of low pLDDT, etc)
- `uniprot(uniprot_id)` — same as `prediction` but explicit UniProt accession

`qualifier` is a UniProt accession (e.g. `P00533`).

## Data source

`https://alphafold.ebi.ac.uk/api/`

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

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

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

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
