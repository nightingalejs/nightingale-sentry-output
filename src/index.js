import { Client as RavenClient } from 'raven';
import levels from 'nightingale-levels';

const mapToSentryLevel = {
  [levels.TRACE]: 'debug',
  [levels.DEBUG]: 'debug',
  [levels.INFO]: 'info',
  [levels.WARNING]: 'warning',
  [levels.ERROR]: 'error',
  [levels.FATAL]: 'fatal',
  [levels.EMERGENCY]: 'fatal',
};

export default function sentryOutput(ravenUrl) {
  const ravenClient = new RavenClient(ravenUrl);

  return function write(_, { level, metadata, extra }) {
    let error = metadata && metadata.error;

    if (!error) {
      return;
    }

    const extraData = { ...metadata, extra };
    delete extraData.error;

    if (error.originalError) {
      // error-processor
      extraData.parsedStack = error.stackTrace.toArray();
      error = error.originalError;
    }

    ravenClient.captureError(
      error,
      {
        level: mapToSentryLevel[level] || 'error',
        extra: extraData,
      },
    );
  };
}
