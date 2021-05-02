import {escapeStringForRegex} from "./escape_regexp";

export type MatcherResult = [number, number, string]

/** Generate Regular Expression from a string. By default it will be escaped */
export function generateRegExp(pattern: string, flags = 'igm', escaped: boolean = true): RegExp {
  return new RegExp(escaped ? escapeStringForRegex(pattern) : pattern, flags);
}

/** Extended Regular Expressions */
export class Matcher {

  private readonly _regexp: RegExp;

  /**
   * Create a new Matcher - either based on a string or an existing regular expression
   * @param pattern {string|RegExp} The pattern to be used - can be a string or a RegExp
   * @param [flags=igm] {string} Will be ignored if an instance of RegExp is given to pattern
   * @param escaped {boolean} If set to true, the pattern will be escaped. Will be ignored if an instance of RegExp is given to pattern
   */
  constructor(pattern: string | RegExp, flags = "igm", escaped = false) {
    if (typeof pattern === "string") {
      this._regexp = generateRegExp(pattern, flags, escaped);
    } else { this._regexp = pattern; }
  }

  /** Resets the last index to 0 (important if the global flag is set) */
  private _reset(): void {
    if (this._regexp.lastIndex) this._regexp.lastIndex = 0;
  }

  /** Always returns the first match for a string (resetting the internal RegExp in the process) */
  matchFirst(value: string): MatcherResult | null {
    this._reset();
    return this.matchNext(value);
  }

  /**
   * Returns the next match for a string or null if none can be found
   * @param value {string} String to match
   * @param [offset=0] optional offset for the indices
   * @returns {Array|null}
   */
  matchNext(value: string, offset = 0): MatcherResult | null {
    let match = this._regexp.exec(value);
    if (match) return [offset + match.index, offset + match.index + match[0].length, match[0]];
    else return null;
  }

  /**
   * Test for a string
   * @param value String to test for
   * @param [reset=true] Whether to reset the lastIndex of the underlying regular expression
   */
  test(value: string, reset = true): boolean {
    if (reset) this._reset();
    return this._regexp.test(value);
  }

  /**
   * Returns all matches for a string
   * @param value  String to match
   * @param offset Offset each index
   */
  matchAll(value: string, offset: number = 0): MatcherResult[] {
    if (!this._regexp.global) {
      console.log('Warning: Regex was initialized without g flag. Returning first match');
      const match = this.matchFirst(value);
      if (match) return [match];
      else return [];
    }
    let match, matches = [];
    this._reset();
    while (match = this.matchNext(value, offset)) {
      matches.push(match);
    }
    return matches;
  }

  /**
   * Parses a string for matches and extracts them into a clean string
   */
  extractMatches(value: string): { cleanValue: string, matches: MatcherResult[] } {
    const matches = this.matchAll(value);
    let cleanValue = '';
    let lastIndex = 0;
    matches.forEach(match => {
      const start = match[0], end = match[1];
      cleanValue += value.substring(lastIndex, start);
      lastIndex = end;
    });
    cleanValue += value.substring(lastIndex, value.length);
    cleanValue = cleanValue.trim();
    return {cleanValue, matches};
  }

  /**
   * Replace all matches with a new value
   * @param value String to match
   * @param replaceValue String to be put in place of all matches
   */
  replace(value: string, replaceValue: string): string {
    return value.replace(this._regexp, replaceValue);
  }

  /** Get the underlying regular expression */
  get regexp(): RegExp {
    return this._regexp;
  }
}
