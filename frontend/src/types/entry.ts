export type ContentBlock = {
  type: 'paragraph' | 'image';
  value: string;
};

export interface Entry {
  _id?: string;
  title: string;
  contentBlocks: ContentBlock[];
  createdAt?: string;
}
