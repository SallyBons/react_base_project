const required = value => (value ? undefined : 'This field is required');
const minLength = value => (value.length >= 3 ? undefined : 'Must be 3 letters or more');
const minLengthOverview = value => (value.length >= 6 ? undefined : 'Must be 6 letters or more');
const maxLength = value => (value.length <= 150 ? undefined : 'Max length - 150');
const specialSymbols = value => (value && /[!@#$%^&*]/i.test(value) ? 'Dont use special symbols!' : undefined);
const matchesPassword = (value, allValues) => (value === allValues.password ? undefined : 'Passwords must match');
const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);


export {
  required,
  minLength,
  minLengthOverview,
  maxLength,
  specialSymbols,
  matchesPassword,
  email,
};
