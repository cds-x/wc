import { CdxSkiplink } from './skiplink.element.js';

!customElements.get('cdx-skiplink')
  ? window.customElements.define('cdx-skiplink', CdxSkiplink)
  : console.warn('cdx-skiplink registered already');

declare global {
  interface HTMLElementTagNameMap {
    'cdx-skiplink': CdxSkiplink;
  }
}
