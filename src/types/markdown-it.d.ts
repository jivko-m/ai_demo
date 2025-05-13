declare module 'markdown-it' {
  interface MarkdownIt {
    render(src: string): string;
  }

  interface MarkdownItOptions {
    html?: boolean;
    xhtmlOut?: boolean;
    breaks?: boolean;
    langPrefix?: string;
    linkify?: boolean;
    typographer?: boolean;
    quotes?: string | string[];
    highlight?: (str: string, lang: string) => string;
  }

  interface MarkdownItConstructor {
    new(options?: MarkdownItOptions): MarkdownIt;
    (options?: MarkdownItOptions): MarkdownIt;
  }

  const MarkdownIt: MarkdownItConstructor;
  export default MarkdownIt;
}