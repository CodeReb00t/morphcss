/**
 * Merge class names, filtering out any falsy values.
 *
 * Use this to conditionally combine class names from multiple `css()` calls.
 *
 * @example
 * ```tsx
 * const card = css({ display: 'flex' });
 * const active = css({ background: '#eee' });
 *
 * <div className={cx(card.className, isActive && active.className)} />
 * ```
 */
export function cx(
  ...classes: Array<string | undefined | false | null>
): string {
  return classes.filter(Boolean).join(" ");
}
