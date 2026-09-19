export interface JournalSchemaError {
  title?:
    | {
        errors: string[];
      }
    | undefined;
  shortDescription?:
    | {
        errors: string[];
      }
    | undefined;
  content?:
    | {
        errors: string[];
      }
    | undefined;
  isdraft?:
    | {
        errors: string[];
      }
    | undefined;
  banner?:
    | {
        errors: string[];
      }
    | undefined;
}
