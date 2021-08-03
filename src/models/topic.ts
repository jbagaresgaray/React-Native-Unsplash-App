import {ILinks, IPreviewPhotos} from './generic';
import {IPhoto} from './photo';
import {IUser} from './user';

export interface ITopic {
  id: string;
  slug: string;
  title: string;
  description?: string;
  published_at: string;
  updated_at: string;
  starts_at: string;
  ends_at: string;
  only_submissions_after?: string;
  featured: boolean;
  total_photos: number;
  current_user_contributions?: any[];
  total_current_user_submissions?: number;
  links: ILinks;
  status: string;
  owners: IUser[];
  top_contributors: IUser[];
  cover_photo: IPhoto;
  preview_photos: IPreviewPhotos[];
}
