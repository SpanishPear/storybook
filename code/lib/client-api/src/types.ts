/* eslint-disable camelcase */
import type { Addon } from '@storybook/addons';

import type {
  StoryId,
  StoryName,
  StoryKind,
  ViewMode,
  StoryFn,
  Parameters,
  Args,
  ArgTypes,
  Addon_StoryApi,
  DecoratorFunction,
  LoaderFunction,
  StoryContext,
  Store_RenderContext,
  AnyFramework,
  StoryIdentifier,
  ProjectAnnotations,
} from '@storybook/types';
import { StoryStore, HooksContext } from '@storybook/store';

export type {
  SBType,
  SBScalarType,
  SBArrayType,
  SBObjectType,
  SBEnumType,
  SBIntersectionType,
  SBUnionType,
  SBOtherType,
} from '@storybook/types';

// NOTE: these types are really just here for back-compat. Many of them don't have much meaning
// Remove in 7.0

export interface ErrorLike {
  message: string;
  stack: string;
}

// Metadata about a story that can be set at various levels: global, for a kind, or for a single story.
export interface StoryMetadata {
  parameters?: Parameters;
  decorators?: DecoratorFunction[];
  loaders?: LoaderFunction[];
}
export type ArgTypesEnhancer = (context: StoryContext) => ArgTypes;
export type ArgsEnhancer = (context: StoryContext) => Args;

type StorySpecifier = StoryId | { name: StoryName; kind: StoryKind } | '*';

export interface StoreSelectionSpecifier {
  storySpecifier: StorySpecifier;
  viewMode: ViewMode;
  singleStory?: boolean;
  args?: Args;
  globals?: Args;
}

export interface StoreSelection {
  storyId: StoryId;
  viewMode: ViewMode;
}

export type AddStoryArgs = StoryIdentifier & {
  storyFn: StoryFn<any>;
  parameters?: Parameters;
  decorators?: DecoratorFunction[];
  loaders?: LoaderFunction[];
};

export type StoreItem = StoryIdentifier & {
  parameters: Parameters;
  getDecorated: () => StoryFn<any>;
  getOriginal: () => StoryFn<any>;
  applyLoaders: () => Promise<StoryContext>;
  playFunction: (context: StoryContext) => Promise<void> | void;
  storyFn: StoryFn<any>;
  unboundStoryFn: StoryFn<any>;
  hooks: HooksContext<AnyFramework>;
  args: Args;
  initialArgs: Args;
  argTypes: ArgTypes;
};

export type PublishedStoreItem = StoreItem & {
  globals: Args;
};

export interface StoreData {
  [key: string]: StoreItem;
}

export interface ClientApiParams {
  storyStore: StoryStore<AnyFramework>;
  decorateStory?: ProjectAnnotations<AnyFramework>['applyDecorators'];
  noStoryModuleAddMethodHotDispose?: boolean;
}

export type ClientApiReturnFn<StoryFnReturnType> = (
  ...args: any[]
) => Addon_StoryApi<StoryFnReturnType>;

export interface ClientApiAddon<StoryFnReturnType = unknown> extends Addon {
  apply: (a: Addon_StoryApi<StoryFnReturnType>, b: any[]) => any;
}

export interface ClientApiAddons<StoryFnReturnType> {
  [key: string]: ClientApiAddon<StoryFnReturnType>;
}

export interface GetStorybookStory {
  name: string;
  render: StoryFn;
}

export interface GetStorybookKind {
  kind: string;
  fileName: string;
  stories: GetStorybookStory[];
}

export type RenderContextWithoutStoryContext = Omit<Store_RenderContext, 'storyContext'>;
