interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * AlphaFold DB MCP — predicted protein structures.
 *
 * Auth: none. Docs: https://alphafold.ebi.ac.uk/api-docs
 */


const BASE = 'https://alphafold.ebi.ac.uk/api';
const UA = 'pipeworx-mcp-alphafold/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  {
    name: 'prediction',
    description: 'Full prediction metadata + structure file URLs (PDB, CIF, PAE).',
    inputSchema: {
      type: 'object',
      properties: { qualifier: { type: 'string', description: 'UniProt accession, e.g. "P00533"' } },
      required: ['qualifier'],
    },
  },
  {
    name: 'summary',
    description: 'Short summary for a prediction (organism, sequence, mean pLDDT).',
    inputSchema: {
      type: 'object',
      properties: { qualifier: { type: 'string' } },
      required: ['qualifier'],
    },
  },
  {
    name: 'annotations',
    description: 'Sequence-level annotations (e.g. MUTAGEN, LOW_CONFIDENCE_REGIONS).',
    inputSchema: {
      type: 'object',
      properties: {
        qualifier: { type: 'string' },
        type: { type: 'string', description: 'Annotation type filter (optional).' },
      },
      required: ['qualifier'],
    },
  },
  {
    name: 'uniprot',
    description: 'Alias for prediction — fetch by UniProt accession explicitly.',
    inputSchema: {
      type: 'object',
      properties: { uniprot_id: { type: 'string' } },
      required: ['uniprot_id'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'prediction':
      return afGet(`/prediction/${encodeURIComponent(reqStr(args, 'qualifier', '"P00533"'))}`);
    case 'summary':
      return afGet(`/uniprot/summary/${encodeURIComponent(reqStr(args, 'qualifier', '"P00533"'))}.json`);
    case 'annotations': {
      const q = reqStr(args, 'qualifier', '"P00533"');
      const type = (args.type as string | undefined) ?? 'MUTAGEN';
      return afGet(`/annotations/${encodeURIComponent(q)}?type=${encodeURIComponent(type)}`);
    }
    case 'uniprot':
      return afGet(`/prediction/${encodeURIComponent(reqStr(args, 'uniprot_id', '"P00533"'))}`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function afGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (res.status === 404) throw new Error('AlphaFold: not found');
  if (!res.ok) throw new Error(`AlphaFold: ${res.status} ${await res.text().then((t) => t.slice(0, 200))}`);
  return res.json();
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) {
    throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  }
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
