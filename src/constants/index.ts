export const USERS_URL = `/api/users`;

export const MESSAGES = {
  REQUIRED_FIELDS: 'Request body should contain required fields',
  PERSON_NOT_FOUND: 'User Not Found',
  INVALID_UUID: 'Invalid UserId. Not uuid',
  NOT_FOUND: 'Please check if URL is correct',
  WRONG_METHOD: 'Current endpoint does not support this method',
  INTERNAL_ERROR: 'Internal server error occurred!',
  INVALID_JSON: 'Invalid body format. Use JSON format.',
};

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
};

export const REQUIRED_FIELDS = ['username', 'age', 'hobbies'];
