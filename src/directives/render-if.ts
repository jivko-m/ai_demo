import {html, nothing} from 'lit';
import { directive, Directive, PartType, type PartInfo } from 'lit/directive.js';
import type {TemplateResult} from 'lit';

/**
 * A directive that conditionally renders HTML content based on a boolean condition.
 * If the condition is true, the content is rendered; otherwise, nothing is rendered.
 */
class RenderIfDirective extends Directive {
  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.CHILD) {
      throw new Error('renderIf() can only be used in child expressions');
    }
  }

  render(condition: boolean, template: TemplateResult | (() => TemplateResult)): TemplateResult {
    return condition 
      ? (typeof template === 'function' ? template() : template) 
      : html`${nothing}`;
  }
}

/**
 * A directive that conditionally renders HTML content based on a boolean condition.
 * 
 * @param condition - The condition to evaluate
 * @param template - The template to render if condition is true
 * @returns The rendered content or nothing
 * 
 * @example
 * ```ts
 * html`
 *   <div>
 *     ${renderIf(isLoggedIn, html`<p>Welcome, user!</p>`)}
 *   </div>
 * `
 * ```
 */
export const renderIf = directive(RenderIfDirective);

// Type declaration for the directive
declare module 'lit/directive.js' {
  interface DirectiveTypeMap {
    'render-if': typeof RenderIfDirective;
  }
}
