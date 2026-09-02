import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import { IPhoto } from '../interfaces/photo';
import PhotosService from './api/photos';

/**
 * Downloads a photo and saves it to the device's media library.
 *
 * Steps:
 * 1. Calls the Unsplash "track download" endpoint (required for attribution and
 *    returns the actual full-resolution download URL).
 * 2. Downloads the image into a temporary cache file using expo-file-system.
 * 3. Requests write permission for the media library.
 * 4. Imports the file into the photo library via expo-media-library.
 */
export const downloadPhoto = async (photo: IPhoto): Promise<void> => {
  if (!photo?.id) {
    throw new Error('Invalid photo.');
  }

  const { data } = await PhotosService.trackDownloadPhoto(photo.id);
  const imageUrl: string = data?.url || photo.urls?.full || photo.urls?.raw;

  if (!imageUrl) {
    throw new Error('Unable to resolve download URL.');
  }

  const file = await FileSystem.File.downloadFileAsync(
    imageUrl,
    new FileSystem.Directory(FileSystem.Paths.cache),
  );

  const permission = await MediaLibrary.requestPermissionsAsync(true);
  if (!permission.granted) {
    throw new Error('Permission to save photos was denied.');
  }

  await MediaLibrary.Asset.create(file.uri);
};
