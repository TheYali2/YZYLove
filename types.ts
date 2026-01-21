export interface YeItem {
  id: string;
  code: string;
  name: string;
  type: 'ALBUM' | 'UNRELEASED' | 'FASHION';
  image: string;
  description: string;
  year: string;
  artist?: string;
  best_song?: string;
  streamCount?: string;
  disableDownload?: boolean;
  downloadUrl?: string;
  albumUrl?: string;
}

export enum ViewState {
  GRID = 'GRID',
  DETAIL = 'DETAIL'
}