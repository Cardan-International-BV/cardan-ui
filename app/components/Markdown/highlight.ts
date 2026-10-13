// One bundled highlight.js instance for MarkdownPreview and MarkdownEditor, so
// md-editor-v3 does not load highlight.js and its theme from a CDN at runtime.
import hljs from 'highlight.js/lib/core';
// Registers the common languages (including css, javascript and typescript) on the core instance
import 'highlight.js/lib/common';
import 'highlight.js/styles/stackoverflow-dark.css';
// Served from the app's own origin, for the <link> that md-editor-v3 adds
import codeThemeUrl from 'highlight.js/styles/stackoverflow-dark.min.css?url';

export { hljs, codeThemeUrl };
