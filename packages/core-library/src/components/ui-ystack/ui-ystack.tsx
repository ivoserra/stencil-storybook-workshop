import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ui-ystack',
  styleUrl: 'ui-ystack.scss',
  shadow: true,
})
export class UiYStack {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
