import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ui-icon',
  styleUrl: 'ui-icon.scss',
  shadow: true,
})
export class UIIcon {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
