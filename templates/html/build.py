#!/usr/bin/env python3
"""Assemble standalone document HTML using only the Python standard library."""
import argparse
import html
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TYPES = {
    'ceo-presentation': 'presentation',
    'functional-spec': 'specification',
    'ceo-tech-presentation': 'presentation',
    'architecture-technical-spec': 'specification',
    'implementation-technical-spec': 'specification',
}

class Content(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.articles = 0
        self.document_type = None
        self.h1 = False
        self.title = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            if attrs['id'] in self.ids:
                raise ValueError('Duplicate ID: ' + attrs['id'])
            self.ids.add(attrs['id'])
        if tag == 'article' and attrs.get('id') == 'document-content':
            self.articles += 1
            self.document_type = attrs.get('data-document-type')
        if tag == 'h1': self.h1 = True
        if tag in ('html', 'head', 'body', 'link', 'iframe'):
            raise ValueError('Content must be an article fragment, without ' + tag)
        if tag == 'script' and (attrs.get('type') != 'text/plain' or attrs.get('data-role') != 'diagram-source'):
            raise ValueError('Only inert diagram-source scripts belong in content')
    def handle_endtag(self, tag):
        if tag == 'h1': self.h1 = False
    def handle_data(self, data):
        if self.h1: self.title.append(data)

def build(kind, content, output):
    source = content.read_text(encoding='utf-8')
    parsed = Content()
    parsed.feed(source)
    if parsed.articles != 1 or not parsed.title:
        raise ValueError('Content needs one article#document-content and a document h1')
    if parsed.document_type != kind:
        raise ValueError('article data-document-type must match --type: ' + kind)
    shell = (ROOT / 'shells' / (TYPES[kind] + '.html')).read_text()
    replacements = {
        '{{TITLE}}': html.escape(''.join(parsed.title)),
        '{{CONTENT}}': source.strip(),
        '{{STYLE}}': (ROOT / 'style.css').read_text(),
        '{{RUNTIME}}': (ROOT / 'runtime.js').read_text(),
        '{{LICENSE}}': (ROOT / 'plantuml-license.txt').read_text(),
    }
    # Single substitution pass prevents content placeholders from being interpreted.
    import re
    result = re.sub(r'\{\{(?:TITLE|CONTENT|STYLE|RUNTIME|LICENSE)\}\}', lambda m: replacements[m[0]], shell)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(result, encoding='utf-8')
    print(output)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--type', '--kind', dest='type', choices=TYPES)
    parser.add_argument('--content', type=Path, help='Custom semantic article fragment')
    parser.add_argument('--output', type=Path, help='Standalone HTML destination')
    args = parser.parse_args()
    if args.content or args.output:
        if not (args.type and args.content and args.output):
            parser.error('--type, --content, and --output are required together')
        build(args.type, args.content, args.output)
    else:
        for kind in ([args.type] if args.type else TYPES):
            build(kind, ROOT / 'outlines' / (kind + '.html'), ROOT / 'starters' / (kind + '.html'))

if __name__ == '__main__': main()
