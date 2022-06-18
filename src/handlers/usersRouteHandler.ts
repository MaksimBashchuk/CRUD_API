import { IncomingMessage, ServerResponse } from 'http';
import { MESSAGES, METHODS } from '../constants';
import { ReqBodyUser } from '../models';
import { addNewUser, getAllUsers } from '../service';
import { getReqBody, isValidPostBody, sendErrorResponse, sendSuccessResponse } from '../utils';

export const handleUsersRoute = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { method } = req;

    switch (method) {
      case METHODS.GET:
        const users = getAllUsers();
        sendSuccessResponse(res, 200, users);
        break;

      case METHODS.POST:
        const body = await getReqBody<ReqBodyUser>(req);

        if (!isValidPostBody(body)) {
          sendErrorResponse(res, 400, MESSAGES.REQUIRED_FIELDS);
          break;
        }

        const newUser = addNewUser(body);
        sendSuccessResponse(res, 201, newUser);
        break;

      default:
        sendErrorResponse(res, 405, MESSAGES.WRONG_METHOD);
        break;
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return sendErrorResponse(res, 400, MESSAGES.INVALID_JSON);
    }
    sendErrorResponse(res, 500, MESSAGES.INTERNAL_ERROR);
  }
};
