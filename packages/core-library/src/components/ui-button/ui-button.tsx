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
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() active: boolean = false;

  // Content
  @Prop() label?: string;
  @Prop() icon: string = '';
  @Prop() iconPosition: 'left' | 'right' = 'left';

  // ARIA
  @Prop() ariaLabel?: string = '';
  @Prop() ariaDescribedBy?: string = '';
  @Prop() ariaControls: string = '';
  @Prop() ariaExpanded?: boolean;
  @Prop() ariaHaspopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  @Prop() ariaPressed?: boolean;

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
          'active': this.active,
        }}
        type={this.type}
        disabled={isDisabled}
        onClick={this.handleClick}
        aria-busy={this.loading ? 'true' : null}
        aria-label={this.ariaLabel || null}
        aria-describedby={this.ariaDescribedBy || null}
        aria-controls={this.ariaControls || null}
        aria-expanded={this.ariaExpanded}
        aria-haspopup={this.ariaHaspopup}
        aria-pressed={this.ariaPressed ?? this.active}
      >
        {this.loading && (
          <span class="loader" aria-hidden="true" role="status">
            Loading
          </span>
        )}

        {/* <ui-icon name={this.icon} aria-hidden="true" /> */}

        {!this.loading && this.icon && this.iconPosition === 'left' && <span>icons</span>}

        {this.label && <span class="ui-button__label">{this.label}</span>}

        {!this.loading && this.icon && this.iconPosition === 'right' && <span>icon</span>}

        <slot />
      </button>
    );
  }
}
