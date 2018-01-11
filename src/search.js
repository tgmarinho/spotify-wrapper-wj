/* global fetch */
import { API_URL, HEADERS } from './config';
import { toJSON } from './utils';

export const search = (query, type) =>
  fetch(`${API_URL}/search?q=${query}&type=${type}`, HEADERS).then(toJSON);

export const searchArtists = query =>
  search(query, 'artist', HEADERS);

export const searchAlbums = query =>
  search(query, 'album', HEADERS);

export const searchTracks = query =>
  search(query, 'track', HEADERS);

export const searchPlaylists = query =>
  search(query, 'playlist', HEADERS);
