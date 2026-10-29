import markdownit from 'markdown-it';
import { attrs } from '@mdit/plugin-attrs';
import { mark } from '@mdit/plugin-mark';
import {
  headingOffsetExtension,
  swatchExtension,
  italicExtension,
  targetBlankExtension,
} from './extensions';

import { hljs } from './highlight';
import { escapeHTML } from '../../utils/markdown';

/**
 * The attributes a text may set with `{…}` when it is not trusted: a language
 * for a phrase (`{lang=en}`), its direction and a class. Never an event
 * handler, a style, a link or an id, which could clash with the page's own.
 */
const SAFE_ATTRIBUTES = ['lang', 'dir', 'class'];

function highlight(str: string, lang: string) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return (
        '<pre><code class="hljs">' +
        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
        '</code></pre>'
      );
    } catch (error) {
      console.log(error);
    }
  }

  return '<pre><code class="hljs">' + escapeHTML(str) + '</code></pre>';
}

function createRenderer(trusted: boolean) {
  const md = markdownit({ html: trusted, linkify: true, highlight });

  md.use(swatchExtension);
  md.use(targetBlankExtension);
  md.use(italicExtension);
  md.use(headingOffsetExtension);
  md.use(attrs, trusted ? {} : { allowed: SAFE_ATTRIBUTES });
  md.use(mark);

  return md;
}

/** Made once, shared by every MarkdownPreview. */
const renderers = {
  safe: createRenderer(false),
  trusted: createRenderer(true),
};

export type MarkdownRenderOptions = {
  /** Allow raw HTML and every `{…}` attribute: only for text the team wrote. */
  trusted?: boolean;
  /** Inline content only (emphasis, code, links), without `<p>` or blocks. */
  inline?: boolean;
  /** Levels to move the text's own headings down: 1 turns `##` into `<h3>`. */
  headingOffset?: number;
};

export function renderMarkdown(
  content: string,
  {
    trusted = false,
    inline = false,
    headingOffset = 0,
  }: MarkdownRenderOptions = {},
) {
  const md = trusted ? renderers.trusted : renderers.safe;
  const env = { headingOffset };

  return inline ? md.renderInline(content, env) : md.render(content, env);
}
