from __future__ import annotations

import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve()
SITE_ROOT = SCRIPT_PATH.parents[1]
SOURCE_ROOT = (SITE_ROOT / ".." / ".." / "我的数据" / "AI记录").resolve()
CONTENT_DIR = SOURCE_ROOT / "内容"
CATALOG_DIR = SOURCE_ROOT / "目录"
TARGET_FILE = SITE_ROOT / "assets" / "data.js"

FRONTMATTER_RE = re.compile(r"\A---\s*\n(.*?)\n---\s*(?:\n|$)", re.S)
WIKILINK_RE = re.compile(r"\[\[AI记录/内容/([^|\]]+)(?:\|[^\]]+)?\]\]")
CODE_BLOCK_RE = re.compile(r"```.*?```", re.S)


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def require_dir(path: Path, label: str) -> None:
    if not path.is_dir():
        fail(f"{label} does not exist: {path}")


def ensure_target_is_safe(target: Path) -> None:
    resolved_site = SITE_ROOT.resolve()
    resolved_target = target.resolve()
    if resolved_site not in resolved_target.parents:
        fail(f"target is outside site root: {resolved_target}")


def validate_paths() -> None:
    require_dir(SOURCE_ROOT, "source root")
    require_dir(CONTENT_DIR, "content directory")
    require_dir(CATALOG_DIR, "catalog directory")
    require_dir(TARGET_FILE.parent, "assets directory")
    ensure_target_is_safe(TARGET_FILE)


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError as exc:
        fail(f"file is not valid UTF-8: {path}: {exc}")
    except OSError as exc:
        fail(f"cannot read file: {path}: {exc}")


def split_frontmatter(markdown: str) -> tuple[dict[str, object], str]:
    match = FRONTMATTER_RE.match(markdown)
    if not match:
        return {}, markdown

    metadata: dict[str, object] = {}
    lines = match.group(1).splitlines()
    index = 0
    while index < len(lines):
        line = lines[index]
        if not line.strip() or ":" not in line:
            index += 1
            continue

        key, raw_value = line.split(":", 1)
        key = key.strip()
        value = raw_value.strip()
        if value:
            metadata[key] = value.strip('"').strip("'")
            index += 1
            continue

        items: list[str] = []
        index += 1
        while index < len(lines) and lines[index].startswith("  - "):
            items.append(lines[index][4:].strip())
            index += 1
        metadata[key] = items

    return metadata, markdown[match.end():]


def first_heading(markdown: str) -> str | None:
    for line in markdown.splitlines():
        match = re.match(r"^#\s+(.+?)\s*$", line)
        if match:
            return match.group(1).strip()
    return None


def note_title(path: Path, metadata: dict[str, object], body: str) -> str:
    title = metadata.get("title")
    if isinstance(title, str) and title.strip():
        return title.strip()

    heading = first_heading(body)
    if heading:
        return heading

    return path.stem


def note_tags(metadata: dict[str, object]) -> list[str]:
    tags = metadata.get("tags")
    if isinstance(tags, list):
        return [str(tag).strip() for tag in tags if str(tag).strip()]
    if isinstance(tags, str) and tags.strip():
        return [tag.strip() for tag in tags.split(",") if tag.strip()]
    return []


def build_category_map() -> dict[str, list[str]]:
    category_map: dict[str, list[str]] = {}
    for catalog_path in sorted(CATALOG_DIR.glob("*.md"), key=lambda item: item.name.lower()):
        category = catalog_path.stem
        text = read_text(catalog_path)
        for match in WIKILINK_RE.finditer(text):
            stem = Path(match.group(1)).stem
            category_map.setdefault(stem, [])
            if category not in category_map[stem]:
                category_map[stem].append(category)
    return category_map


def clean_markdown_text(markdown: str) -> str:
    text = CODE_BLOCK_RE.sub(" ", markdown)
    text = re.sub(r"!\[\[([^\]]+)\]\]", r"\1", text)
    text = re.sub(r"\[\[([^|\]]+)\|([^\]]+)\]\]", r"\2", text)
    text = re.sub(r"\[\[([^\]]+)\]\]", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.M)
    text = re.sub(r"[*_>#\-|]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def summarize(markdown: str, title: str, limit: int = 180) -> str:
    text = clean_markdown_text(markdown)
    if text.startswith(title):
        text = text[len(title):].strip()
    if len(text) <= limit:
        return text
    return text[:limit].rstrip() + "..."


def count_words(markdown: str) -> int:
    text = clean_markdown_text(markdown)
    chinese_chars = re.findall(r"[\u4e00-\u9fff]", text)
    latin_words = re.findall(r"[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*", text)
    return len(chinese_chars) + len(latin_words)


def source_path_for(path: Path) -> str:
    return path.relative_to(SITE_ROOT.parents[2]).as_posix()


def build_articles() -> list[dict[str, object]]:
    category_map = build_category_map()
    articles: list[dict[str, object]] = []
    content_paths = sorted(CONTENT_DIR.glob("*.md"), key=lambda item: item.name.lower())

    for index, path in enumerate(content_paths, start=1):
        markdown = read_text(path)
        metadata, body = split_frontmatter(markdown)
        title = note_title(path, metadata, body)
        categories = category_map.get(path.stem, ["未分类"])
        articles.append(
            {
                "id": f"note-{index}",
                "title": title,
                "fileTitle": path.stem,
                "categories": categories,
                "tags": note_tags(metadata),
                "summary": summarize(body, title),
                "wordCount": count_words(body),
                "sourceFile": source_path_for(path),
                "markdown": body.strip(),
            }
        )

    if not articles:
        fail(f"no markdown articles found in {CONTENT_DIR}")

    return articles


def build_data() -> dict[str, object]:
    articles = build_articles()
    category_names = sorted({category for article in articles for category in article["categories"]})
    generated_at = datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")
    return {
        "generatedAt": generated_at,
        "source": source_path_for(SOURCE_ROOT),
        "categories": ["全部文章", *category_names],
        "featuredIds": [str(article["id"]) for article in articles[:4]],
        "articles": articles,
    }


def write_data_file(data: dict[str, object]) -> None:
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    content = f"window.AI_EPIC_DATA = {payload};\n"
    try:
        TARGET_FILE.write_text(content, encoding="utf-8", newline="\n")
    except OSError as exc:
        fail(f"cannot write target file: {TARGET_FILE}: {exc}")


def main() -> None:
    validate_paths()
    data = build_data()
    write_data_file(data)
    print(f"Generated articles: {len(data['articles'])}")
    print(f"Generated categories: {len(data['categories'])}")
    print(f"Target: {TARGET_FILE}")
    print(f"generatedAt: {data['generatedAt']}")


if __name__ == "__main__":
    main()
