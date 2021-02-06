export interface response {
  enabled: boolean;
  readonly user?: string;
  readonly input: string;
  readonly output: string;
  readonly caseSensitive?: boolean;
  readonly punctuationSensitive?: boolean;
}