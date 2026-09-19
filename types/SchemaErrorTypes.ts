export interface JournalSchemaError {
  title?:
    | {
        errors: string[];
      }
    | undefined;
  AdditionalDescription?:
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

export interface ProjectSchemaError {
  title?:
    | {
        errors: string[];
      }
    | undefined;
  Link?:
    | {
        errors: string[];
      }
    | undefined;
  tags?:
    | {
        errors: string[];
      }
    | undefined;
  Description?:
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
  AdditionalDescription?:
    | {
        errors: string[];
      }
    | undefined;
  projectLiveUrl?:
    | {
        errors: string[];
      }
    | undefined;
  githubLink?:
    | {
        errors: string[];
      }
    | undefined;
  videoDemo?:
    | {
        errors: string[];
      }
    | undefined;
  image?: {
    errors: string[];
  };
}
