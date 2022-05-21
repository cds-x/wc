import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { baseStyles } from '../internal';
import styles from './skiplink.element.scss';
import '@cds/core/dropdown/register.js';
import { CdsDropdown } from '@cds/core/dropdown';

/**
 * @element cdx-skiplink
 */
export class CdxSkiplink extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  @property({ type: String })
  parent?: string;

  @property({ type: String })
  target!: string;

  targetElement!: HTMLElement;

  @query('#skiplink')
  skiplink!: HTMLAnchorElement;

  @query('#skiplink-anchor')
  anchor!: HTMLAnchorElement;

  @query('#skip-dropdown')
  dropdown!: CdsDropdown;

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    // Determine where to render to
    let renderTo;
    if (this.parent) {
      renderTo = document.querySelector(`#${this.parent}`);
    } else {
      renderTo = document.querySelector('body');
    }

    // Allow the target to be focusable
    // TODO, clean up after yourself when this is destroyed
    document.querySelector(`#${this.target}`)?.setAttribute('tabindex', '-1');

    // Move the nodes
    this.parentNode?.removeChild(this);
    renderTo?.prepend(this)

    // Handle the visibility stuff
    this.skiplink.addEventListener('focus', () =>
      this.skiplink.removeAttribute('cds-layout')
    );
    this.skiplink.addEventListener('focusout', () =>
      this.skiplink.setAttribute('cds-layout', 'display:screen-reader-only')
    );
  }

  updates() {
    console.log('whats up danger? ');
  }

  render() {
    return html`
      <a
        cds-first-focus
        id="skiplink"
        cds-layout="display:screen-reader-only"
        href="${this.targetId()}"
      >
        <slot></slot>
      </a>
    `;
  }

  targetId(): string {
    return `#${this.target}`;
  }
}
