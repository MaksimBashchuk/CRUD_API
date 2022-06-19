import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { METHODS, MESSAGES, REPLACE_TOKEN } from '../constants';
import { IUser, OptionalReqBodyUser } from '../models';
import { getUserById, deleteUser, updateUser } from '../service';
import {
  sendSuccessResponse,
  getReqBody,
  sendErrorResponse,
  parseIdFromUrl,
  isValidUpdateBody,
} from '../utils';

export const handleSpecificUserRoutes = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { method, url } = req;
    const userId = parseIdFromUrl(url as string);

    if (!validate(userId)) {
      return sendErrorResponse(res, 400, MESSAGES.INVALID_UUID);
    }

    const user = getUserById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, MESSAGES.USER_NOT_FOUND.replace(REPLACE_TOKEN, userId));
    }

    switch (method) {
      case METHODS.GET:
        sendSuccessResponse(res, 200, user);
        break;

      case METHODS.PUT:
        const body = await getReqBody<OptionalReqBodyUser>(req);

        if ((<IUser>body).id) {
          sendErrorResponse(res, 400, MESSAGES.ID_UPDATE);
          break;
        }

        if (!isValidUpdateBody(body)) {
          sendErrorResponse(res, 400, MESSAGES.PARTIALLY_REQUIRED_FIELDS);
          break;
        }

        const updatedUser = updateUser(user, body);
        sendSuccessResponse(res, 200, updatedUser);
        break;

      case METHODS.DELETE:
        deleteUser(userId);
        sendErrorResponse(res, 204, MESSAGES.DELETED);
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
