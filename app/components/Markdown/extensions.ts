import type { MarkdownIt } from 'markdown-it';

export function swatchExtension(md: MarkdownIt) {
  const defaultRender =
    md.renderer.rules.code_inline ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.code_inline = function (tokens, idx, options, env, self) {
    if (
      (tokens[idx]?.content?.startsWith('#') &&
        (tokens[idx]?.content?.length === 4 ||
          tokens[idx]?.content?.length === 7)) ||
      tokens[idx]?.content?.startsWith('rgb') ||
      tokens[idx]?.content?.startsWith('hsl')
    ) {
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
