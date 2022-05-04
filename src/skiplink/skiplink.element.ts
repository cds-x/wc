import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '../internal';
import styles from './skiplink.element.scss';

/**
 * @element cdx-skiplink
 */
export class CdxSkiplink extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div>I am skiplink</div>
    `;
  }
}
