export interface ISituations {
  [name: string]: ISituation
}
  
export interface ISituation {
  header: string;
  description: string;
  options: string[];
}

export enum ContentType {
  youtube = "youtube",
  options = "options",
  iframe = "iframe",
  conflict = "conflict",
}
  
export interface IContent<T extends YoutubeContent | OptionsContent | IframeContent | ConflictContent> {
  position: number[];
  type: ContentType;
  header: string;
  content: T;
}

export type AnyContent = IContent<YoutubeContent> | IContent<OptionsContent> | IContent<IframeContent> | IContent<ConflictContent>;

export interface YoutubeContent {
  url: string;
}

export interface IframeContent {
  url: string;
  height?: number | string;
}

export interface OptionsContent {
  description: string;
  bannerImg: string;
  options: string[];
  correctAnswers: number[];
}
export interface ConflictContent {
  description: string;
  situationImg: string;
  situationSpeech: string;
  situationBalloonClass?: string;
  options: string[];
  reactions: { correct: boolean, text: string, image: string }[];
}
