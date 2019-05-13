
// Passwords
// sallybons.mail@gmail.com - 06121995
// jason.bourne@cia.gov - 13091970

const applicationUsers = [{
  name: 'Anastasiya',
  surname: 'Solovey',
  passwordHash: '-113370517',
  email: 'sallybons.mail@gmail.com',
  isAdmin: true
}, {
  name: 'Jason',
  surname: 'Bourne',
  passwordHash: '-1055235796',
  email: 'jason.bourne@cia.gov',
  isAdmin: false
}];

const calculateHash = (password) => {
  let hash = 0;
  if (password.length === 0) {
    return hash;
  }
  for (let i = 0; i < password.length; i += 1) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char; // eslint-disable-line no-bitwise
    hash &= hash; // eslint-disable-line no-bitwise
  }
  return hash;
};

const authentificateUser = (email, password) => {
  for (let index = 0; index < applicationUsers.length; index += 1) {
    const user = applicationUsers[index];

    if (user.email === email && String(user.passwordHash) === String(calculateHash(password))) {
      return Object.assign({}, user);
    }
  }
  return {};
};

const validateUserEmailRegistraion = (email) => {
  for (let index = 0; index < applicationUsers.length; index += 1) {
    const user = applicationUsers[index];
    if (email === user.email) {
      return 'There is already a user with such email in the system';
    }
  }
  return undefined;
};

const validateUserEmail = (email) => {
  for (let index = 0; index < applicationUsers.length; index += 1) {
    const user = applicationUsers[index];
    if (email === user.email) {
      return undefined;
    }
  }
  return 'There is no user with such email';
};

const validateUserPassword = (password) => {
  for (let index = 0; index < applicationUsers.length; index += 1) {
    const user = applicationUsers[index];
    if (String(calculateHash(password)) === user.passwordHash) {
      return undefined;
    }
  }
  return 'Password is incorrect';
};

const addNewUser = (name, surname, password, email, isAdmin = false) => {
  const newUser = {
    name,
    surname,
    passwordHash: calculateHash(password),
    email,
    isAdmin
  };
  applicationUsers.push(newUser);
  return newUser;
};

export {
  addNewUser,
  authentificateUser,
  validateUserEmail,
  validateUserPassword,
  validateUserEmailRegistraion
};
