export const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

export const isValidEmail = (value) => {
  if (!isNonEmptyString(value)) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const toNumberOrZero = (value) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
};
