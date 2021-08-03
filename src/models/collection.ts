import {ILinks, IMeta, IPreviewPhotos, ITag} from './generic';
import {IPhoto} from './photo';
import {IUser} from './user';

export interface ICollection {
  id: string;
  title: string;
  description?: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  curated: boolean;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  tags: ITag[];
  links: ILinks;
  user: IUser;
  cover_photo: IPhoto;
  preview_photos: IPreviewPhotos[];
}

export interface ICollectionExtended extends ICollection {
  meta: IMeta;
}

export interface IRelatedCollections {
  total: number;
  type: string;
  results: ICollection[];
}
