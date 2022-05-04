/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import 'lib/counter/register.js';
import { html } from 'lit';
import { CdaCounter } from './counter.element';

export default {
  title: 'Stories/Counter',
  component: 'cda-counter',
  argTypes: {
    value: { control: 'number' },
  },
};

// interface Story<T> {
//   (args: T): TemplateResult;
//   args?: Partial<T>;
//   argTypes?: Record<string, unknown>;
// }
//
// interface ArgTypes {
//   value?: number;
// }

export const basic = () => {
  let value = 42;

  function handleEvent(event: CustomEvent) {
    const counter: CdaCounter | null = document.querySelector('#basic-counter');

    if (counter && event.detail === 'increment') {
      counter.value++;
    } else if (counter && event.detail === 'decrement') {
      counter.value--;
    } else {
      console.warn('unexpected event: ', event);
    }
  }
  return html`
    <cda-counter
      id="basic-counter"
      .value="${value}"
      @cdaValueChange="${(event: CustomEvent) => handleEvent(event)}"
    ></cda-counter>
  `;
};
