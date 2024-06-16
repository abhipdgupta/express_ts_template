import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

// Directory path for logs
const logsDirectory = path.join(process.cwd(), 'logs');

// Ensure logs directory exists, create if not
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// Create write streams for access and error logs
const accessLogStream = fs.createWriteStream(
  path.join(logsDirectory, 'access.log'),
  { flags: 'a' },
);
const errorLogStream = fs.createWriteStream(
  path.join(logsDirectory, 'error.log'),
  { flags: 'a' },
);

// Custom log formats
const customLogFormat =
  '[:remote-addr][:date[web]] :method :url status::status response-time::response-time ms - size::res[content-length] bytes';

// Middleware for access log
export const accessLogMiddleware = morgan(customLogFormat, {
  stream: accessLogStream,
});

// Middleware for error log
export const errorLogMiddleware = morgan(customLogFormat, {
  stream: errorLogStream,
  skip: (req, res) => res.statusCode < 400,
});

// Middleware for custom log format
export const customLogMiddleware = morgan((tokens, req, res) => {
  return `${tokens.method(req, res)} ${tokens.url(req, res)} - ${tokens.status(
    req,
    res,
  )} [${tokens['response-time'](req, res)} ms - ${
    tokens.res(req, res, 'content-length') ?? '0'
  } bytes ]`;
});
