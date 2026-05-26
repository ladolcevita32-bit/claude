# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

This repository contains two independent projects:

### 1. Next.js Web App (root)
- **Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Vitest
- **Entry**: `src/app/page.tsx`
- **Components**: `src/components/ui/` (shadcn-based)
- **Hooks**: `src/hooks/`
- **Tests**: Vitest + Testing Library (`npm test`)
- **Dev server**: `npm run dev` (port 3000)

### 2. S&P Inspection Report Generator (`S&P INSPECTION 보고서/`)
- **Stack**: Python
- **Entry**: `generate_report.py`
- **Engine**: `report_engine/` — modular Python package (models, scoring, narrative, photo, etc.)
- **Workflow**: Input → Config → Photos → Generate → Output (docx)

## Best Practice Reference

`claude-code-best-practice-main/` is the **authoritative source** for Claude Code best practices.

When facing questions about agents, commands, skills, hooks, settings, or MCP:
1. **Search this folder first** — `best-practice/`, `reports/`, `tips/`, `implementation/`
2. Fall back to external docs only if the answer is not found here

## Development Workflow (RPI)

For non-trivial features, use the RPI workflow:

```
/rpi:research <feature-slug>   # Step 1: GO/NO-GO gate
/rpi:plan <feature-slug>       # Step 2: Architecture + docs
/rpi:implement <feature-slug>  # Step 3: Phased implementation
```

Feature folders live at `rpi/<feature-slug>/REQUEST.md`.

Use RPI for: new features, significant refactors, multi-file changes.
Skip RPI for: bug fixes, small UI tweaks, docs-only changes.

## Conventions

### Next.js App
- Components in `src/components/ui/` follow shadcn patterns
- Custom hooks in `src/hooks/` with co-located tests (`*.test.ts`)
- No default exports for components — named exports only
- Run `npm test` before marking any task complete

### Python Report Engine
- Modules in `report_engine/` are single-responsibility
- Config via YAML/JSON in `01_Config/` and `report_engine/*.yaml`
- Photos resolved through `photo_manager.py`

### Git
- Commit messages: `type: concise description` (feat/fix/refactor/docs/chore)
- Create separate commits per logical change — do not bundle unrelated files

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main page (currently modified) |
| `src/hooks/useTodos.ts` | Todo state hook |
| `S&P INSPECTION 보고서/generate_report.py` | Report generation entry |
| `S&P INSPECTION 보고서/report_engine/` | Core report engine |
| `claude-code-best-practice-main/CLAUDE.md` | Best practice configuration reference |
| `claude-code-best-practice-main/best-practice/` | Authoritative best practice docs |

## Subagent Notes

- Subagents **cannot** invoke other subagents via bash — use the Agent tool
- Custom agents defined in `.claude/agents/`
- RPI workflow agents: `requirement-parser`, `product-manager`, `senior-software-engineer`, `ux-designer`, `technical-cto-advisor`, `code-reviewer`
