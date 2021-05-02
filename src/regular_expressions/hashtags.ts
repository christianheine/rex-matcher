/** Matches hashtag tags */
export const hashtags = /(?:^|\s)(#)([a-zA-Z0-9\u0430-\u044f\x7f-\xffёЁ_\-\\/&+!]+)/igm; // Add support for cyrillic alphabet & other special characters

/** Matches the start of a hashtag */
export const startOfHashtag = /((^|\s)(#)[a-z0-9\u0430-\u044f\x7f-\xffёЁ\-_\-\\/&+!]*)$/i;

/** Matches mention tags  */
export const mentions = /(?:^|\s)(@)([a-zA-Z0-9\u0430-\u044f\x7f-\xffёЁ\-_\-\\/&+!]+)/igm;

/** Matches the start of a mention tag */
export const startOfMention = /((^|\s)(@)[a-zA-Z0-9\u0430-\u044f\x7f-\xffёЁ\\-_\-\\/&+!]*)$/i;

/** Matches mention and hashtag tags tags (simple) */
export const hashtagsOrMentions = /(?:^|\s)([#@])[a-zA-Z0-9\u0430-\u044f\x7f-\xffёЁ\\-_\-\\/&+!]+/igm; // /([#@])[a-z0-9\-_]+/igm;

/** Matches mention and hashtag tags tags (start of line or after whitespace only) */
export const tags = /(?:^|[\s]+)([@#])([a-zA-Z0-9\u0430-\u044f\x7f-\xffёЁ\\-_\-\\/&+!]+)/igm;

/** Matches the start of a word */
export const startOfWord = /(^|\s[\S]*)$/;

/** Matches the start of a hashtag or mention tag */
export const startOfHashtagOrMention = /((^|\s)([#@])[a-zA-Z0-9\u0430-\u044f\x7f-\xffёЁ\\-_\-\\/&+!]*)$/i;

/** Matches the start of a hashtag-like word */
export const startOfHashtagLikeWord = /((^|\s)[a-zA-Z0-9\u0430-\u044f\x7f-\xffёЁ\\-_\-\\/&+!]*)$/;

/** Matches the end of a word or tag [a-z0-9\-_] */
export const endOfWord = /^[a-z0-9\-_]+\b/;
