export interface Config {
  title: string;
  primaryColor: string;
  apiHost: string;
  chatEndpoint: string;
  quickSuggestions: string[];
  brandingFooterText: string;
  brandingName: string;
  brandingLink: string;
}

export declare function getConfig(): Config;
export declare const config: Config;

