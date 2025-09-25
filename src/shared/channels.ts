export function makeChannels<T extends readonly string[]>(
  feature: string,
  actions: T
) {
  type Action = T[number];
  const out = {} as Record<Action, string>;

  for (const action of actions as readonly Action[]) {
    const kebab = action.toLowerCase().replace(/_/g, "-");
    out[action] = `${feature}:${kebab}`;
  }
  return out;
}

// Example usage
export const CHANNELS = {
  PROJECT: makeChannels("projects", [
    "PICK_FOLDER",
    "READ_FILE",
    "WRITE_FILE",
    "ADD_WORKSPACE",
  ] as const),
  AUTH: makeChannels("auth", ["LOGIN", "LOGOUT", "ME"] as const),
} as const;

// Types
export type Channel =
  | (typeof CHANNELS.PROJECT)[keyof typeof CHANNELS.PROJECT]
  | (typeof CHANNELS.AUTH)[keyof typeof CHANNELS.AUTH];
