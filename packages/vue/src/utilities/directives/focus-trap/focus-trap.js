const focusableElements = [
  "a[href]",
  "button",
  "button:not([disabled])",
  "[tabindex]",
  "[tabindex]:not([disabled])",
  "input",
  "input:not([disabled])",
  "select",
  "textarea",
];

export const getFocusableChildrens = (el) => {
  return el.querySelectorAll(focusableElements) || [];
};

export const isFocusable = (e, focusableChildrenElements) => Array.from(focusableChildrenElements).some(
    (el) => el === e.target
  );

export const trap = (e, focusableChildrenElements) => {
  if (!focusableChildrenElements.length || e.key !== "Tab") return;
  if (!isFocusable(e, focusableChildrenElements)) {
    e.preventDefault();
    focusableChildrenElements[0].focus();
  }
  if (focusableChildrenElements.length === 1) {
    e.preventDefault();
    return;
  }

  const lastElementIndex = focusableChildrenElements.length - 1;
  const isLastElement =
    e.target === focusableChildrenElements[lastElementIndex];
  const isFirstElement = e.target === focusableChildrenElements[0];

  const isGoingForward = e.shiftKey === false;

  if (isGoingForward && isLastElement) {
    e.preventDefault();
    focusableChildrenElements[0].focus();
  } else if (!isGoingForward && isFirstElement) {
    e.preventDefault();
    focusableChildrenElements[lastElementIndex].focus();
  }
};
