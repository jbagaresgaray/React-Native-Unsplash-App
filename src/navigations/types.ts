import type {
  NavigationProp,
  NavigatorScreenParams,
  StaticScreenProps,
} from '@react-navigation/native';

export type UserProfileParams = {
  username: string;
};

export type ImageDetailsParams = {
  id: string;
};

export type CollectionDetailsParams = {
  id: string;
};

export type OAuthRedirectParams = {
  code?: string;
  error?: string;
};

export type TopicDetailParams = {
  id_or_slug: string;
};

export type HomeStackParamList = {
  Home: undefined;
  Topics: undefined;
  TopicDetail: TopicDetailParams;
};

export type CollectionStackParamList = {
  Collections: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
};

export type AccountStackParamList = {
  Accounts: undefined;
};

export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList> | undefined;
  CollectionsStack: NavigatorScreenParams<CollectionStackParamList> | undefined;
  Upload: undefined;
  SearchStack: NavigatorScreenParams<SearchStackParamList> | undefined;
  AccountStack: NavigatorScreenParams<AccountStackParamList> | undefined;
};

export type RootStackParamList = {
  Landing: undefined;
  Register: undefined;
  Login: undefined;
  Main: NavigatorScreenParams<BottomTabParamList> | undefined;
  UserProfile: UserProfileParams;
  ImageDetails: ImageDetailsParams;
  CollectionDetails: CollectionDetailsParams;
  OAuthRedirect: OAuthRedirectParams;
};

/**
 * Destinations reachable from shared components rendered in multiple stacks.
 * Root routes are included because React Navigation actions bubble to parents.
 */
export type AppParamList = RootStackParamList &
  BottomTabParamList &
  HomeStackParamList &
  CollectionStackParamList &
  SearchStackParamList &
  AccountStackParamList;

export type AppNavigation = NavigationProp<AppParamList>;

export type UserProfileScreenProps = StaticScreenProps<UserProfileParams>;
export type ImageDetailsScreenProps = StaticScreenProps<ImageDetailsParams>;
export type CollectionDetailsScreenProps =
  StaticScreenProps<CollectionDetailsParams>;
export type TopicDetailScreenProps = StaticScreenProps<TopicDetailParams>;
export type OAuthRedirectScreenProps = StaticScreenProps<OAuthRedirectParams>;
