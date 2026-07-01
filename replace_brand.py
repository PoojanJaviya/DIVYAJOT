from pathlib import Path
from typing import List, Tuple

root = Path(r'd:\divyajot-foundation')
replacements: List[Tuple[str, str]] = [
    ('DIVYAJOT', 'DIVYAJOT'),
    ('DIVYAJOT', 'DIVYAJOT'),
    ('DIVYAJOT', 'DIVYAJOT'),
    ('DIVYAJOT', 'DIVYAJOT'),
    ('divyajot-foundation', 'divyajot-foundation'),
    ('divyajot-backend', 'divyajot-backend'),
    ('divyajot-frontend', 'divyajot-frontend'),
    ('divyajotfoundation', 'divyajotfoundation'),
    ('divyajot_db', 'divyajot_db'),
    ('divyajot_test', 'divyajot_test'),
    ('divyajot_net', 'divyajot_net'),
    ('divyajot_mysql', 'divyajot_mysql'),
    ('divyajot', 'divyajot'),
    ('divyajot', 'divyajot'),
]

updated_files = []
for path in root.rglob('*'):
    if not path.is_file():
        continue
    if path.suffix.lower() in {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.exe', '.dll', '.bin', '.pdf'}:
        continue
    if any(part.startswith('.') for part in path.parts):
        continue
    try:
        text = path.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        continue
    new_text = text
    for old, new in replacements:
        new_text = new_text.replace(old, new)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        updated_files.append(path.relative_to(root).as_posix())

print(f'updated {len(updated_files)} files')
for f in updated_files:
    print(f)
