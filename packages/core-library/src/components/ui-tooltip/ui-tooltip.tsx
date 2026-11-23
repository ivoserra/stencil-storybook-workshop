import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ui-tooltip',
  styleUrl: 'ui-tooltip.scss',
  shadow: true,
})
export class UITooltip {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
