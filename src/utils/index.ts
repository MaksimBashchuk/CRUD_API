import { ServerResponse, IncomingMessage, STATUS_CODES } from 'http';
import { REQUIRED_FIELDS } from '../constants';
import { IUser, OptionalReqBodyUser, ReqBodyUser } from '../models';

export const sendErrorResponse = (res: ServerResponse, statusCode: number, msg: string) => {
  const message = `${STATUS_CODES[statusCode]}: ${msg}`;
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
};

export const sendSuccessResponse = (
  res: ServerResponse,
  statusCode: number,
  body: IUser | IUser[],
) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
};

export const parseIdFromUrl = (url: string) => url?.split('users/')[1];

export const getReqBody = <T>(req: IncomingMessage): Promise<T> =>
  new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('error', () => {
      reject(new Error());
    });
    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch {
        reject(new SyntaxError());
      }
    });
  });

export const isValidPostBody = (body: ReqBodyUser) =>
  REQUIRED_FIELDS.every((item) => body[item as keyof ReqBodyUser]);

export const isValidUpdateBody = (body: OptionalReqBodyUser) =>
  REQUIRED_FIELDS.some((item) => body[item as keyof OptionalReqBodyUser]);
