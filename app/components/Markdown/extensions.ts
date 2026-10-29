import type { MarkdownIt } from 'markdown-it';

/**
 * A colour value on its own: `#abc`, `#aabbcc`, `rgb(…)` or `hsl(…)` with only
 * numbers inside. Anything more never reaches the `style` attribute, so a
 * text cannot add its own CSS (such as a background image that loads a URL).
 */
const COLOR_VALUE =
  /^(#[0-9a-f]{3}|#[0-9a-f]{6}|(rgb|hsl)a?\([\d\s.,%/+-]+(deg)?[\d\s.,%/+-]*\))$/i;

export function swatchExtension(md: MarkdownIt) {
  const defaultRender =
    md.renderer.rules.code_inline ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.code_inline = function (tokens, idx, options, env, self) {
    if (COLOR_VALUE.test(tokens[idx]?.content ?? '')) {
      tokens[idx].attrPush(['data-color', tokens[idx]?.content]);
      tokens[idx].attrPush(['style', '--color:' + tokens[idx]?.content]);
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}

export function targetBlankExtension(md: MarkdownIt) {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];

    if (token?.attrIndex('target') === -1) {
      token.attrPush(['target', '_blank']);
      token.attrPush(['title', 'opent in nieuw venster']);
    } else {
      token?.attrSet('target', '_blank');
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}

/**
 * Moves every heading down by `env.headingOffset` levels (at most `<h6>`), so
 * a text's own `##` fits under the heading of the section that shows it.
 */
export function headingOffsetExtension(md: MarkdownIt) {
  const shift: NonNullable<typeof md.renderer.rules.heading_open> = (
    tokens,
    idx,
    options,
    env,
    self,
  ) => {
    const token = tokens[idx];
    const offset = Number(env?.headingOffset ?? 0);

    if (token && offset > 0) {
      const level = Math.min(6, Number(token.tag.slice(1)) + offset);
      token.tag = `h${level}`;
    }

    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.heading_open = shift;
  md.renderer.rules.heading_close = shift;
}

export function italicExtension(md: MarkdownIt) {
  md.renderer.rules.em_open = function (tokens, idx, options, env, self) {
    if (tokens[idx]?.type === 'em_open') {
      tokens[idx].tag = 'i';
    }
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.em_close = function (tokens, idx, options, env, self) {
    if (tokens[idx]?.type === 'em_close') {
      tokens[idx].tag = 'i';
    }
    return self.renderToken(tokens, idx, options);
  };
}
