import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { baseStyles } from '../internal';
import styles from './skiplink.element.scss';
import '@cds/core/dropdown/register.js';
// import { CdsDropdown } from '@cds/core/dropdown';
import '@cds/core/dropdown/register.js';
import { id, onKey } from '@cds/core/internal';

type Nullable<T> = T | null | undefined;

/**
 * @element cdx-skiplink
 */
export class CdxSkiplink extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  closable = false;
  defaultPointerType: string | null = null;

  @property({ type: String })
  parent?: string;

  @property({ type: String })
  target!: string;

  targetElement!: HTMLElement;

  // @query('#skiplink-anchor')
  // anchor!: HTMLAnchorElement;

  // @query('#skip-dropdown')
  // dropdown!: CdsDropdown;

  @id()
  popupId!: string;

  @id()
  anchorId!: string;

  connectedCallback() {
    super.connectedCallback();
    // Determine where to render to
    let renderTo;
    if (this.parent) {
      renderTo = document.querySelector(`#${this.parent}`);
    } else {
      renderTo = document.querySelector('body');
    }

    // Allow the target to be focusable
    // TODO: clean up after yourself when this is destroyed
    document.querySelector(`#${this.target}`)?.setAttribute('tabindex', '-1');

    // Move the nodes
    this.parentNode?.removeChild(this);
    renderTo?.prepend(this);

    this.addEventListener('keydown', (event: KeyboardEvent) => {
      onKey('tab', event, () => this.hideDropdown());
    });

  }

  private hideDropdown() {
    this.renderRoot
      .querySelector(`#${this.popupId}`)!
      .setAttribute('hidden', '');
  }

  private showDropdown() {
    this.renderRoot
      .querySelector(`#${this.popupId}`)!
      .removeAttribute('hidden');
  }

  private lastEvent?: Nullable<Event>;

  handleEvent(event: Nullable<Event>) {
    // Handle the double event that gets generated.
    if (this.lastEvent === undefined) {
      this.lastEvent = event;
    } else {
      this.lastEvent = undefined;
      return;
    }
    this.showDropdown();
  }

  // Why does focus event fire after the a element is clicked on first time?
  render() {
    return html`
      <div
          @focus="${(event: Nullable<Event>) => this.handleEvent(event)}"
          popup="${this.popupId}"
          id="${this.anchorId}"
          tabindex="0"
        ></div>
      </div>
      <cds-dropdown hidden id="${this.popupId}" anchor="${this.anchorId}">
        <a
          @click="${(event: Event) => {
            this.hideDropdown();
          }}"
          cds-first-focus
          cds-layout=""
          href="${this.targetId()}"
        >
          <slot></slot>
        </a>
      </cds-dropdown>
    `;
  }

  targetId(): string {
    return `#${this.target}`;
  }
}
