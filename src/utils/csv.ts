/**
 * Spreadsheet-safe CSV serialization helpers.
 * Neutralizes Excel / Google Sheets / LibreOffice formula-injection triggers
 * (=, +, -, @, tab, carriage return — including when preceded by leading spaces)
 * while preserving legitimate Unicode text, quotes, and newlines.
 */

const FORMULA_TRIGGER_PATTERN = /^[\t\r\n\u0000-\u001F ]*[=+\-@]|^[\t\r]/;

export function neutralizeSpreadsheetFormula(value: unknown): string {
  const str = String(value ?? '');
  if (!str) return '';
  if (FORMULA_TRIGGER_PATTERN.test(str)) {
    return `'${str}`;
  }
  return str;
}

export function formatCsvCell(value: unknown): string {
  const safeValue = neutralizeSpreadsheetFormula(value).replace(/"/g, '""');
  return `"${safeValue}"`;
}

export function buildCsvContent(
  headers: readonly string[],
  rows: readonly (readonly unknown[])[],
  options: { includeBom?: boolean } = {}
): string {
  const includeBom = options.includeBom ?? false;
  const headerLine = headers.map((header) => formatCsvCell(header)).join(',');
  const rowLines = rows.map((row) => row.map((cell) => formatCsvCell(cell)).join(','));
  const body = [headerLine, ...rowLines].join('\n');
  return includeBom ? `\uFEFF${body}` : body;
}
