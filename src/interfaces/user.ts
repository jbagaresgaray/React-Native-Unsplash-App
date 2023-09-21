import {
  IBadge,
  ILinks,
  IMeta,
  IPreviewPhotos,
  IProfileImage,
  ISocialLinks,
  ITags,
} from './generic';

export interface IUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: ILinks;
  profile_image: IProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: ISocialLinks;
}

export interface IUserProfile extends IUser {
  followed_by_user: boolean;
  photos: IPreviewPhotos[];
  badge?: IBadge;
  tags: ITags;
  followers_count: number;
  following_count: number;
  allow_messages: boolean;
  numeric_id: number;
  downloads: number;
  meta: IMeta;
}

export interface ISearchUser extends IUser {
  followed_by_user: boolean;
  photos: IPreviewPhotos[];
}