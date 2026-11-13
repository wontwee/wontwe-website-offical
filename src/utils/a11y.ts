import type React from 'react';

/**
 * Shared ARIA tablist keyboard handler supporting Left/Right/Home/End navigation.
 */
export function handleTablistKeyDown(
  e: React.KeyboardEvent<HTMLButtonElement>,
  currentIndex: number,
  total: number,
  onSelect: (nextIndex: number) => void
): void {
  let nextIndex: number | null = null;

  if (e.key === 'ArrowRight') {
    nextIndex = (currentIndex + 1) % total;
  } else if (e.key === 'ArrowLeft') {
    nextIndex = (currentIndex - 1 + total) % total;
  } else if (e.key === 'Home') {
    nextIndex = 0;
  } else if (e.key === 'End') {
    nextIndex = total - 1;
  }

  if (nextIndex === null) return;

  e.preventDefault();
  onSelect(nextIndex);

  const tablist = e.currentTarget.closest('[role="tablist"]');
  if (tablist) {
    const tabs = tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs[nextIndex]?.focus();
  }
}

