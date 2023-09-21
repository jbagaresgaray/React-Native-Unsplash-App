import {IUser} from './user';
import {IExif, ILinks, ILocation, IMeta, ITag, IUrls} from './generic';
import {ITopic} from './topic';
import {IRelatedCollections} from './collection';

export interface IPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: IUrls;
  links: ILinks;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections?: any;
  sponsorship?: any;
  user: IUser;
}

export interface IPhotoExtended extends IPhoto {
  exif: IExif;
  location: ILocation;
  tags: ITag[];
  tags_preview: ITag[];
  views: number;
  downloads: number;
  topics: ITopic[];
  related_collections: IRelatedCollections;
  meta: IMeta;
}
