import { IncomingMessage, ServerResponse } from 'http';
import {} from 'constants';
import { MESSAGES, USERS_URL } from '../constants';
import { sendErrorResponse } from '../utils';

export const router = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { url } = req;

    if (url === USERS_URL || url === `${USERS_URL}/`) {
      // handleUsersRoute();
      return;
    }

    if (url?.match(/\/users\/\w+/)) {
      // handleSpecificUserRoutes();
      return;
    }

    return sendErrorResponse(res, 404, MESSAGES.NOT_FOUND);
  } catch {
    sendErrorResponse(res, 500, MESSAGES.INTERNAL_ERROR);
  }
};
