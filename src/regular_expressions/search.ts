import {escapeStringForRegex} from "../escape_regexp";

/**
 * Regular expression to find tokens of type (type:content) in a string
 * Tokens can have the following patterns:
 *
 *  type:content
 *  type: content
 *  type:"content and more content"
 *  type: "content and more content"
 *
 * @type {RegExp}
 */

export const tokens = /(?:^|[\s]+)(\w+): ?(!?['"“‘„”»][\w\d- ]*['"”’»]|!?[\w\d]+)/igm;

/** Regular expression to identify groups of inputs in a string - either in hyphens or as text */
export const hyphenatedGroups = /"([\w\d ]*)['"“”‘’„«»]|([\w\d]+)/igm;

/** Identify all hyphens in a string */
export const hyphens = /['"“”‘’„«»]/igm;

/**
 * Takes a group of search values and returns a regex to match against them
 * @param {array} searchTerms Array of search terms
 * @param flags Flags for the regular expression
 */
export const searchRegExpFromSearchTerms = (searchTerms: string[], flags = "im") => {
  if (!searchTerms || searchTerms.length === 0) return null;

  if (searchTerms.length > 0) {
    const pattern = "^" + searchTerms.map(g => "(?=.*" + escapeStringForRegex(g) + ")").join("") + ".*$";
    return new RegExp(pattern, flags);
  } else {
    return null;
  }
};

/**
 * Takes a group of search values and returns a regex to match against them
 * @param {array} groups Array of search terms
 */
export const highlightRegExpFromSearchTerms = (groups: string[]): RegExp | null => {
  if (!groups || groups.length === 0) return null;

  if (groups.length > 0) {
    return new RegExp(groups.map(g => "(" + g + ")").join("|"), "igm");
  } else {
    return null;
  }
};
