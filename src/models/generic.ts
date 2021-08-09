import {ICollection} from './collection';
import {IPhoto} from './photo';
import {ISearchUser, IUser} from './user';

export interface ILinks {
  self: string;
  html: string;
  photos?: string;
  likes?: string;
  portfolio?: string;
  following?: string;
  followers?: string;
  download?: string;
  download_location?: string;
}

export interface IUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface IProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface IPreviewPhotos {
  id: string;
  created_at: string;
  updated_at: string;
  blur_hash: string;
  urls: IUrls;
}

export interface ISocialLinks {
  instagram_username?: string;
  portfolio_url?: string;
  twitter_username?: string;
  paypal_email?: string;
}

export interface IBadge {
  title: string;
  primary: boolean;
  slug: string;
  link: string;
}

export interface ITagSourceAncestrySlug {
  slug: string;
  pretty_slug: string;
}

export interface ITagSourceAncestry {
  type: ITagSourceAncestrySlug;
  category: ITagSourceAncestrySlug;
}

export interface ITagSource {
  ancestry: ITagSourceAncestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: IPhoto;
}

export interface ITag {
  type: string;
  title: string;
  source?: ITagSource;
}

export interface ITags {
  custom: ITag[];
  aggregated: ITag[];
}

export interface IExif {
  make?: string;
  model?: string;
  exposure_time?: string;
  aperture?: string;
  focal_length?: string;
  iso?: number;
}

export interface IGeolocation {
  latitude: number;
  longitude: number;
}

export interface ILocation {
  title: string;
  name: string;
  city: string;
  country: string;
  position: IGeolocation;
}

export interface IMeta {
  title?: string;
  description?: string;
  index: boolean;
}

export interface ISearchCollections {
  total: number;
  total_pages: number;
  results: ICollection[];
}

export interface ISearchPhotos {
  total: number;
  total_pages: number;
  results: IPhoto[];
}

export interface ISearchUsers {
  total: number;
  total_pages: number;
  results: ISearchUser[];
}