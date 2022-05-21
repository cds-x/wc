/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import 'lib/skiplink/register.js';
import { html } from 'lit';

export default {
  title: 'Stories/Skiplink',
  component: 'cdx-skiplink',
};

export function basic () {
  return html`
    <cdx-skiplink target="content">Skip to content</cdx-skiplink>
    <p>Hello</p>
    <p>Goodbye</p>
    <main id="content">
      <p>I am the main content. Go <a href>An inline link</a></p>
    </main>
  `;
}

export function parentalLink() {
  return html`
    <cdx-skiplink target="content">Skip to content</cdx-skiplink>
    <p>Hello</p>
    <p>Goodbye</p>
    <main id="content">
      <p>I am the main content. Go <a href>An inline link</a></p>
    </main>
    <section id="section">
      <cdx-skiplink target="nav" parent="section">Skip to section</cdx-skiplink>
      <nav id="nav">
        <a href>Nav 1</a>
        <a href>Nav 2</a>
        <a href>Nav 3</a>
      </nav>
    </section>
  `;
}
