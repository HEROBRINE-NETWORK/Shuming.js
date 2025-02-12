/** @format */
import moment from 'moment-timezone';
import { TIME_ZONE } from "../config.js";

class Logger {
  constructor(options = {}) {
    // Default to Asia/Dhaka timezone if not specified
    const { badges = {}, showTimestamp = true, timeZone = TIME_ZONE } = options;

    this.colors = {
      info: '\x1b[34m',   // Blue
      warn: '\x1b[33m',   // Yellow
      error: '\x1b[31m',  // Red
      success: '\x1b[32m', // Green
      log: '\x1b[37m',    // White
      reset: '\x1b[0m',   // Reset to default color
    };

    // Default badge icons with customization option
    this.badges = {
      info: badges.info || 'ℹ️',
      warn: badges.warn || '⚠️',
      error: badges.error || '❌',
      success: badges.success || '✅',
      log: badges.log || '➕',
    };

    this.showTimestamp = showTimestamp; // Option to show timestamps in logs
    this.timeZone = timeZone;           // Timezone setting (default to Asia/Dhaka)
  }

  _getTimestamp() {
    if (!this.showTimestamp) return ''; // No timestamp if the feature is off

    // Use moment-timezone to format the current time based on the specified timezone
    const now = moment().tz(this.timeZone).format('YYYY-MM-DD HH:mm:ss');
    return `[${now}] `;
  }

  _printLog(type, message) {
    const badge = this.badges[type] || ' ';
    const color = this.colors[type] || this.colors.log;
    const timestamp = this._getTimestamp();

    console.log(`${color}${badge} ${timestamp}${message}${this.colors.reset}`);
  }

  info(message) {
    this._printLog('info', message);
    return this; // Enable method chaining
  }

  warn(message) {
    this._printLog('warn', message);
    return this; // Enable method chaining
  }

  error(message) {
    this._printLog('error', message);
    return this; // Enable method chaining
  }

  success(message) {
    this._printLog('success', message);
    return this; // Enable method chaining
  }

  log(message) {
    this._printLog('log', message);
    return this; // Enable method chaining
  }
}

export default Logger;