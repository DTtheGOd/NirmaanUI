import validator from "validator";

export function validateRegister({ name, email, password }) {
  const errors = [];
  if (!name || name.length < 2) errors.push("Name must be at least 2 chars");
  if (!email || !validator.isEmail(email)) errors.push("Valid email required");
  if (!password || password.length < 6)
    errors.push("Password must be 6+ chars");
  return errors;
}

export function validateLogin({ email, password }) {
  const errors = [];
  if (!email || !validator.isEmail(email)) errors.push("Valid email required");
  if (!password) errors.push("Password required");
  return errors;
}
