# AI Epic Data Updater Design

## Goal

Build a manual update tool for `mydata/web/AI史诗纪实` so the static site can refresh article data from `mydata/我的数据/AI记录` with one command, without asking AI or a person to hand-edit `assets/data.js`.

## Approved Choices

- Run mode: manual command.
- Command shape: `python tools/update_data.py`.
- Featured articles: automatically use the first 4 generated articles.
- Scope: generate site data only. Do not delete, rename, move, or rewrite source notes.

## Current Context

The site is a static HTML/CSS/JavaScript project. `index.html` loads `assets/data.js`, which defines `window.AI_EPIC_DATA`. The frontend expects:

- `generatedAt`: ISO timestamp.
- `source`: source note folder path.
- `categories`: category labels, including `全部文章`.
- `featuredIds`: article ids shown in the featured section.
- `articles`: generated article records.

Each article record currently contains:

- `id`
- `title`
- `fileTitle`
- `categories`
- `tags`
- `summary`
- `wordCount`
- `sourceFile`
- `markdown`

The source content lives under:

- `mydata/我的数据/AI记录/内容`
- `mydata/我的数据/AI记录/目录`

Directory notes use Obsidian wikilinks such as `[[AI记录/内容/codex|codex]]` to point to content notes. These links can be used to infer article categories.

## Recommended Architecture

Create a no-dependency Python script at `tools/update_data.py` inside the website project. The script scans the source notes, builds an in-memory data object, validates paths, then writes a complete UTF-8 `assets/data.js`.

This keeps the existing static site model intact. It avoids introducing a Node/npm build system or external Markdown dependencies for a task that only needs deterministic local data generation.

## Data Flow

1. Resolve the website root from the script location.
2. Resolve the source root as `../../我的数据/AI记录`.
3. Verify the source root, content directory, catalog directory, and target `assets/data.js`.
4. Read catalog Markdown files from `目录`.
5. Extract wikilinks that point to `AI记录/内容/...`.
6. Build a mapping from content filename stem to category names.
7. Read all content Markdown files from `内容`.
8. For each note:
   - Parse frontmatter when present.
   - Use frontmatter `title`, then first Markdown H1, then filename stem as title.
   - Parse frontmatter `tags` as a list.
   - Derive categories from catalog links.
   - Fall back to `未分类` when no catalog link points to the note.
   - Generate summary from cleaned Markdown text.
   - Estimate word count from Chinese characters and Latin word tokens.
   - Preserve original Markdown in the `markdown` field.
9. Sort articles by filename for deterministic output.
10. Assign ids as `note-1`, `note-2`, etc.
11. Set `featuredIds` to the first 4 article ids.
12. Serialize to `window.AI_EPIC_DATA = ...;`.
13. Write the complete generated file as UTF-8.

## Path Safety

The script must treat these as hard boundaries:

- Read only from `mydata/我的数据/AI记录`.
- Write only to `mydata/web/AI史诗纪实/assets/data.js`.

Before writing, it should resolve absolute paths and verify the target file stays inside the website root. It must not use `rmdir`, deletion commands, recursive moving, or shell command composition.

## Error Handling

- If the source folder does not exist, print a clear error and exit non-zero.
- If required subfolders are missing, print which path is missing and exit non-zero.
- If the target path is outside the website root after resolution, exit non-zero.
- If a Markdown file cannot be read as UTF-8, report the file path and exit non-zero.
- If no articles are found, exit non-zero rather than generating an empty site silently.

## Output

After a successful run, the script should print:

- Number of generated articles.
- Number of categories.
- Target file path.
- Timestamp used in `generatedAt`.

## Testing And Verification

Initial verification should include:

- Run `python tools/update_data.py`.
- Confirm exit code 0 and printed article/category counts.
- Confirm `assets/data.js` begins with `window.AI_EPIC_DATA =`.
- Confirm generated JSON can be parsed after stripping the JavaScript assignment wrapper.
- Start a local static server and verify the page loads article counts and can open at least one article.

## Out Of Scope

- No automatic scheduling.
- No git hooks.
- No article rewriting or AI summarization.
- No deletion, renaming, or moving of source Markdown files.
- No frontend redesign.
- No full Markdown rendering overhaul.

## Self-Review

- No placeholder requirements remain.
- The design matches the approved manual command and first-4 featured rule.
- The design keeps the change scoped to a generator tool and generated data.
- Path safety is explicit and avoids dangerous shell deletion patterns.
