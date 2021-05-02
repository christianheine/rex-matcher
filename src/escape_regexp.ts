const specialRegexpCharacters = /[-[\]/{}()*+?.\\^$|]/ig;

export function escapeStringForRegex(value: string): string {
  return value.replace(specialRegexpCharacters, "\\$&");
}
