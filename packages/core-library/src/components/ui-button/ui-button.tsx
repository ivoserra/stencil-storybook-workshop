import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'ui-button',
  styleUrl: 'ui-button.scss',
  shadow: true,
})
export class UIButton {
  // Appearance
  @Prop() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  // Behaviour
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() disabled = false;
  @Prop() loading = false;

  // Content
  @Prop() label = 'Button';
  @Prop() icon = '';
  @Prop() iconPosition: 'left' | 'right' = 'left';

  // Events
  @Event() buttonClick!: EventEmitter<MouseEvent>;

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) return;

    this.buttonClick.emit(event);
  };

  render() {
    const isDisabled = this.disabled || this.loading;

    return (
      <button
        class={{
          'ui-button': true,
          [this.variant]: true,
          [this.size]: true,
          'is-loading': this.loading,
        }}
        type={this.type}
        disabled={isDisabled}
        aria-busy={this.loading ? 'true' : null}
        onClick={this.handleClick}
      >
        {this.loading && <span class="loader" aria-hidden="true" />}

        {!this.loading && this.icon && this.iconPosition === 'left' && <ui-icon name={this.icon} aria-hidden="true" />}

        <span class="ui-button__label">
          <slot>{this.label}</slot>
        </span>

        {!this.loading && this.icon && this.iconPosition === 'right' && <ui-icon name={this.icon} aria-hidden="true" />}

        {this.loading && (
          <span class="sr-only" role="status">
            Loading
          </span>
        )}
      </button>
    );
  }
}
