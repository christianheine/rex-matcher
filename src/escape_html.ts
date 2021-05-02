const htmlSpecialCharacters = /[&<>"']/ig;

/**
 * Replacement map for html special characters
 */
const htmlReplaceMap: { [id: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;"
};

/** Accessor function to get special characters (as dedicated function to allow for browser optimization) */
const getHtmlReplacementCharacters = (char: string) => htmlReplaceMap[char];

/** Replace html special characters */
export function escapeStringForHtml(value: string): string {
  return value.replace(htmlSpecialCharacters, getHtmlReplacementCharacters);
}
