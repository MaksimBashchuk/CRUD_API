import { ServerResponse, STATUS_CODES } from 'http';

export const sendErrorResponse = (res: ServerResponse, statusCode: number, msg: string) => {
  const message = `${STATUS_CODES[statusCode]}: ${msg}`;
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
};
