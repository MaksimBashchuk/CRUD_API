export const USERS_URL = '/api/users';
export const REPLACE_TOKEN = '/token/';

export const MESSAGES = {
  REQUIRED_FIELDS: 'Request body should contain required fields',
  PARTIALLY_REQUIRED_FIELDS: 'Request body should contain at least one of the required fields',
  DELETED: 'User was successfully deleted',
  USER_NOT_FOUND: `User with id='${REPLACE_TOKEN}' does not exist`,
  INVALID_UUID: 'Invalid UserId. Not uuid',
  NOT_FOUND: 'Please check if URL is correct',
  WRONG_METHOD: 'Current endpoint does not support this method',
  INTERNAL_ERROR: 'Internal server error occurred!',
  INVALID_JSON: 'Invalid body format. Use JSON format.',
  ID_UPDATE: 'Please do not change or create id manually. It generates on server side.',
};

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
};

export const REQUIRED_FIELDS = { USERNAME: 'username', AGE: 'age', HOBBIES: 'hobbies' };
