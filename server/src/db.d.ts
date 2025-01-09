/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from 'kysely';

export type ArrayType<T> = ArrayTypeImpl<T> extends (infer U)[] ? U[] : ArrayTypeImpl<T>;

export type ArrayTypeImpl<T> = T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S[], I[], U[]> : T[];

export type AssetsStatusEnum = 'active' | 'deleted' | 'trashed';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Json = JsonValue;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [x: string]: JsonValue | undefined;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Sourcetype = 'exif' | 'machine-learning';

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Activity {
  albumId: string;
  assetId: string | null;
  comment: string | null;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  isLiked: Generated<boolean>;
  updatedAt: Generated<Timestamp>;
  userId: string;
}

export interface Albums {
  albumName: Generated<string>;
  /**
   * Asset ID to be used as thumbnail
   */
  albumThumbnailAssetId: string | null;
  createdAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
  description: Generated<string>;
  id: Generated<string>;
  isActivityEnabled: Generated<boolean>;
  order: Generated<string>;
  ownerId: string;
  updatedAt: Generated<Timestamp>;
}

export interface AlbumsAssetsAssets {
  albumsId: string;
  assetsId: string;
}

export interface AlbumsSharedUsersUsers {
  albumsId: string;
  role: Generated<string>;
  usersId: string;
}

export interface ApiKeys {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  key: string;
  name: string;
  permissions: string[];
  updatedAt: Generated<Timestamp>;
  userId: string;
}

export interface AssetFaces {
  assetId: string;
  boundingBoxX1: Generated<number>;
  boundingBoxX2: Generated<number>;
  boundingBoxY1: Generated<number>;
  boundingBoxY2: Generated<number>;
  id: Generated<string>;
  imageHeight: Generated<number>;
  imageWidth: Generated<number>;
  personId: string | null;
  sourceType: Generated<Sourcetype>;
}

export interface AssetFiles {
  assetId: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  path: string;
  type: string;
  updatedAt: Generated<Timestamp>;
}

export interface AssetJobStatus {
  assetId: string;
  duplicatesDetectedAt: Timestamp | null;
  facesRecognizedAt: Timestamp | null;
  metadataExtractedAt: Timestamp | null;
  previewAt: Timestamp | null;
  thumbnailAt: Timestamp | null;
}

export interface Assets {
  checksum: Buffer;
  createdAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
  deviceAssetId: string;
  deviceId: string;
  duplicateId: string | null;
  duration: string | null;
  encodedVideoPath: Generated<string | null>;
  fileCreatedAt: Timestamp;
  fileModifiedAt: Timestamp;
  id: Generated<string>;
  isArchived: Generated<boolean>;
  isExternal: Generated<boolean>;
  isFavorite: Generated<boolean>;
  isOffline: Generated<boolean>;
  isVisible: Generated<boolean>;
  libraryId: string | null;
  livePhotoVideoId: string | null;
  localDateTime: Timestamp;
  originalFileName: string;
  originalPath: string;
  ownerId: string;
  sidecarPath: string | null;
  stackId: string | null;
  status: Generated<AssetsStatusEnum>;
  thumbhash: Buffer | null;
  type: string;
  updatedAt: Generated<Timestamp>;
}

export interface AssetStack {
  id: Generated<string>;
  ownerId: string;
  primaryAssetId: string;
}

export interface Audit {
  action: string;
  createdAt: Generated<Timestamp>;
  entityId: string;
  entityType: string;
  id: Generated<number>;
  ownerId: string;
}

export interface Exif {
  assetId: string;
  autoStackId: string | null;
  bitsPerSample: number | null;
  city: string | null;
  colorspace: string | null;
  country: string | null;
  dateTimeOriginal: Timestamp | null;
  description: Generated<string>;
  exifImageHeight: number | null;
  exifImageWidth: number | null;
  exposureTime: string | null;
  fileSizeInByte: Int8 | null;
  fNumber: number | null;
  focalLength: number | null;
  fps: number | null;
  iso: number | null;
  latitude: number | null;
  lensModel: string | null;
  livePhotoCID: string | null;
  longitude: number | null;
  make: string | null;
  model: string | null;
  modifyDate: Timestamp | null;
  orientation: string | null;
  profileDescription: string | null;
  projectionType: string | null;
  rating: number | null;
  state: string | null;
  timeZone: string | null;
}

export interface FaceSearch {
  embedding: string;
  faceId: string;
}

export interface GeodataPlaces {
  admin1Code: string | null;
  admin1Name: string | null;
  admin2Code: string | null;
  admin2Name: string | null;
  alternateNames: string | null;
  countryCode: string;
  earthCoord: Generated<string | null>;
  id: number;
  latitude: number;
  longitude: number;
  modificationDate: Timestamp;
  name: string;
}

export interface Libraries {
  createdAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
  exclusionPatterns: string[];
  id: Generated<string>;
  importPaths: string[];
  name: string;
  ownerId: string;
  refreshedAt: Timestamp | null;
  updatedAt: Generated<Timestamp>;
}

export interface Memories {
  createdAt: Generated<Timestamp>;
  data: Json;
  deletedAt: Timestamp | null;
  id: Generated<string>;
  isSaved: Generated<boolean>;
  memoryAt: Timestamp;
  ownerId: string;
  seenAt: Timestamp | null;
  type: string;
  updatedAt: Generated<Timestamp>;
}

export interface MemoriesAssetsAssets {
  assetsId: string;
  memoriesId: string;
}

export interface Migrations {
  id: Generated<number>;
  name: string;
  timestamp: Int8;
}

export interface MoveHistory {
  entityId: string;
  id: Generated<string>;
  newPath: string;
  oldPath: string;
  pathType: string;
}

export interface NaturalearthCountries {
  admin: string;
  admin_a3: string;
  coordinates: string;
  id: Generated<number>;
  type: string;
}

export interface Partners {
  createdAt: Generated<Timestamp>;
  inTimeline: Generated<boolean>;
  sharedById: string;
  sharedWithId: string;
  updatedAt: Generated<Timestamp>;
}

export interface Person {
  birthDate: Timestamp | null;
  createdAt: Generated<Timestamp>;
  faceAssetId: string | null;
  id: Generated<string>;
  isHidden: Generated<boolean>;
  name: Generated<string>;
  ownerId: string;
  thumbnailPath: Generated<string>;
  updatedAt: Generated<Timestamp>;
}

export interface Sessions {
  createdAt: Generated<Timestamp>;
  deviceOS: Generated<string>;
  deviceType: Generated<string>;
  id: Generated<string>;
  token: string;
  updatedAt: Generated<Timestamp>;
  userId: string;
}

export interface SharedLinkAsset {
  assetsId: string;
  sharedLinksId: string;
}

export interface SharedLinks {
  albumId: string | null;
  allowDownload: Generated<boolean>;
  allowUpload: Generated<boolean>;
  createdAt: Generated<Timestamp>;
  description: string | null;
  expiresAt: Timestamp | null;
  id: Generated<string>;
  key: Buffer;
  password: string | null;
  showExif: Generated<boolean>;
  type: string;
  userId: string;
}

export interface SmartInfo {
  assetId: string;
  objects: string[] | null;
  smartInfoTextSearchableColumn: Generated<string>;
  tags: string[] | null;
}

export interface SmartSearch {
  assetId: string;
  embedding: string;
}

export interface SocketIoAttachments {
  created_at: Generated<Timestamp | null>;
  id: Generated<Int8>;
  payload: Buffer | null;
}

export interface SystemConfig {
  key: string;
  value: string | null;
}

export interface SystemMetadata {
  key: string;
  value: Json;
}

export interface TagAsset {
  assetsId: string;
  tagsId: string;
}

export interface Tags {
  color: string | null;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  parentId: string | null;
  updatedAt: Generated<Timestamp>;
  userId: string;
  value: string;
}

export interface TagsClosure {
  id_ancestor: string;
  id_descendant: string;
}

export interface UserMetadata {
  key: string;
  userId: string;
  value: Json;
}

export interface Users {
  createdAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
  email: string;
  id: Generated<string>;
  isAdmin: Generated<boolean>;
  name: Generated<string>;
  oauthId: Generated<string>;
  password: Generated<string>;
  profileChangedAt: Generated<Timestamp>;
  profileImagePath: Generated<string>;
  quotaSizeInBytes: Int8 | null;
  quotaUsageInBytes: Generated<Int8>;
  shouldChangePassword: Generated<boolean>;
  status: Generated<string>;
  storageLabel: string | null;
  updatedAt: Generated<Timestamp>;
}

export interface VectorsPgVectorIndexStat {
  idx_growing: ArrayType<Int8> | null;
  idx_indexing: boolean | null;
  idx_options: string | null;
  idx_sealed: ArrayType<Int8> | null;
  idx_size: Int8 | null;
  idx_status: string | null;
  idx_tuples: Int8 | null;
  idx_write: Int8 | null;
  indexname: string | null;
  indexrelid: number | null;
  tablename: string | null;
  tablerelid: number | null;
}

export interface DB {
  activity: Activity;
  albums: Albums;
  albums_assets_assets: AlbumsAssetsAssets;
  albums_shared_users_users: AlbumsSharedUsersUsers;
  api_keys: ApiKeys;
  asset_faces: AssetFaces;
  asset_files: AssetFiles;
  asset_job_status: AssetJobStatus;
  asset_stack: AssetStack;
  assets: Assets;
  audit: Audit;
  exif: Exif;
  face_search: FaceSearch;
  geodata_places: GeodataPlaces;
  libraries: Libraries;
  memories: Memories;
  memories_assets_assets: MemoriesAssetsAssets;
  migrations: Migrations;
  move_history: MoveHistory;
  naturalearth_countries: NaturalearthCountries;
  partners: Partners;
  person: Person;
  sessions: Sessions;
  shared_link__asset: SharedLinkAsset;
  shared_links: SharedLinks;
  smart_info: SmartInfo;
  smart_search: SmartSearch;
  socket_io_attachments: SocketIoAttachments;
  system_config: SystemConfig;
  system_metadata: SystemMetadata;
  tag_asset: TagAsset;
  tags: Tags;
  tags_closure: TagsClosure;
  user_metadata: UserMetadata;
  users: Users;
  'vectors.pg_vector_index_stat': VectorsPgVectorIndexStat;
}