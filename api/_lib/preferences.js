const REPORT_STYLES = new Set(["profit_status", "detailed", "creative"]);

function normalizePreferences(preferences = {}) {
  return {
    enabled: preferences.enabled !== false,
    times: Array.isArray(preferences.times) ? preferences.times : [],
    salesEnabled: preferences.salesEnabled !== false,
    reportStyle: REPORT_STYLES.has(preferences.reportStyle) ? preferences.reportStyle : "detailed"
  };
}

function getReportStyle(preferences = {}) {
  return REPORT_STYLES.has(preferences.reportStyle) ? preferences.reportStyle : "detailed";
}

module.exports = {
  normalizePreferences,
  getReportStyle
};
