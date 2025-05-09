import { nothing } from 'lit';
import { directive, Directive, PartType } from 'lit/directive.js';

/**
 * A directive that conditionally renders HTML content based on a boolean condition.
 * If the condition is true, the content is rendered; otherwise, nothing is rendered.
 */
class RenderIfDirective extends Directive {
  constructor(partInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.CHILD) {
      throw new Error('renderIf() can only be used in child expressions');
    }
  }

  render(condition, template) {
    return condition ? template : nothing;
  }
}

/**
 * A directive that conditionally renders HTML content based on a boolean condition.
 * 
 * @param {boolean} condition - The condition to evaluate
 * @param {TemplateResult} template - The template to render if condition is true
 * @returns {any} The rendered content or noChange
 * 
 * @example
 * ```js
 * html`
 *   <div>
 *     ${renderIf(isLoggedIn, html`<p>Welcome, user!</p>`)}
 *   </div>
 * `
 * ```
 */
export const renderIf = directive(RenderIfDirective);
