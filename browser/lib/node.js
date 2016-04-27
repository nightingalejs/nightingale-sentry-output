'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || /**
                                 * @function
                                 * @param target
                                */ function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = sentryOutput;

var _raven = require('raven');

/**
 * @function
 * @param ravenUrl
*/function sentryOutput(ravenUrl) {
    var ravenClient = new _raven.Client(ravenUrl);

    return (/**
            * @function
            * @param _
            * @param
           */function write(_, _ref) {
            var metadata = _ref.metadata;
            var extra = _ref.extra;

            var error = metadata.error;

            if (!error) {
                return;
            }

            var extraData = _extends({}, metadata, { extra: extra });
            delete extraData.error;

            if (error.originalError) {
                // error-processor
                extraData.parsedStack = error.stackTrace.toArray();
                error = error.originalError;
            }

            ravenClient.captureError(error, {
                extra: extraData
            });
        }
    );
}
//# sourceMappingURL=node.js.map