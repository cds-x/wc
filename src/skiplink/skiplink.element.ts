import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { baseStyles } from '../internal';
import styles from './skiplink.element.scss';

/**
 * @element cdx-skiplink
 */
export class CdxSkiplink extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  @property({type: String})
  parent?: string;

  @property({type: String})
  target!: string;

  @query('#skiplink')
  skiplink!: HTMLAnchorElement;

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    this.parentNode?.removeChild(this);
    const body = document.querySelector('body');
    body?.prepend(this);

    this.addEventListener('focus', () => this.showLink());
    this.addEventListener('blur', () => this.hideLink());
  }

  hideLink() {
    this.skiplink.setAttribute('cds-layout', 'display:screen-reader-only');
  }

  render() {
    return html`
      <a id="skiplink" cds-layout="display:screen-reader-only" href="${this.targetId()}">
        <slot></slot>
      </a>
    `;
  }

  showLink() {
    this.skiplink.removeAttribute('cds-layout');
  }

  targetId(): string {
    return `#${this.target}`;
  }
}

/**
 * API Notes
 * <cds-skiplink target="main" parent="" mode="{link, bar}" position="left | center | right | bar">
 *   Skip to content
 * </cds-skiplink>
 * - must be placed in the right place of the DOM to work (first child(ren) of body element || first child of container element)
 * - must be hidden at all time
 * - attaches itself as first child of the body element (default)
 * - shows itself in 'correct position' when focused
 *   - top left (0,0)
 *   - top stretch (height is??)
 *   - top middle
 *   - top right
 * - has optional parent attribute that it can use as its root (instead of body)
 *
 */
