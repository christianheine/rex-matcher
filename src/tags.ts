import {Matcher} from "./matcher";
import {hashtags, mentions} from "./regular_expressions/hashtags";

export interface ExtendedValue {
  value: string,
  hashtags: string[],
  mentions: string[],
}

const matchHashtags = new Matcher(hashtags);
const matchMentions = new Matcher(mentions);

/** Extracts mentions and hashtags from a string */
export const extractMentionsAndHashtags = (value: string): ExtendedValue => {
  const hashtagMatches = matchHashtags.extractMatches(value);
  const hashtags = hashtagMatches.matches.map(m => m[2].trim().substr(1).toLowerCase());
  const mentionMatches = matchMentions.extractMatches(hashtagMatches.cleanValue);
  const mentions = mentionMatches.matches.map(m => m[2].trim().substr(1).toLowerCase());
  return {value: mentionMatches.cleanValue, hashtags, mentions};
};

/** Merge a value with mentions and hashtags (e.g. for editing) */
export const combineValueWithHashtagsAndMentions = (value: string, hashtags: string[], mentions: string[]): string => {
  const _mentions = mentions && mentions.length ? " @" + mentions.join(" @") : "";
  const _threads = hashtags && hashtags.length ? " #" + hashtags.join(" #") : "";
  const _value = value && value.length > 0 ? value : "";
  return _value + _threads + _mentions;
};
