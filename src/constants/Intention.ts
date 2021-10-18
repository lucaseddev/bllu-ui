export namespace Intent {
  export const NONE = "none";
  export const SUCCESS = "success";
  export const WARNING = "warning";
  export const DANGER = "danger";
}

export type Intent =
  | typeof Intent.NONE
  | typeof Intent.SUCCESS
  | typeof Intent.DANGER
  | typeof Intent.WARNING;
