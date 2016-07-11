'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || /**
                                 * @function
                                 * @param target
                                */ function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mapToSentryLevel;

exports.default = sentryOutput;

var _raven = require('raven');

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param obj
 * @param key
 * @param value
*/
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapToSentryLevel = (_mapToSentryLevel = {}, _defineProperty(_mapToSentryLevel, _nightingaleLevels2.default.TRACE, 'debug'), _defineProperty(_mapToSentryLevel, _nightingaleLevels2.default.DEBUG, 'debug'), _defineProperty(_mapToSentryLevel, _nightingaleLevels2.default.INFO, 'info'), _defineProperty(_mapToSentryLevel, _nightingaleLevels2.default.WARNING, 'warning'), _defineProperty(_mapToSentryLevel, _nightingaleLevels2.default.ERROR, 'error'), _defineProperty(_mapToSentryLevel, _nightingaleLevels2.default.FATAL, 'fatal'), _defineProperty(_mapToSentryLevel, _nightingaleLevels2.default.EMERGENCY, 'fatal'), _mapToSentryLevel);

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
            var level = _ref.level;
            var metadata = _ref.metadata;
            var extra = _ref.extra;

            var error = metadata && metadata.error;

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
                level: mapToSentryLevel[level] || 'error',
                extra: extraData
            });
        }
    );
}
//# sourceMappingURL=node.js.map