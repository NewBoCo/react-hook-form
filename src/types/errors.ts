import { UnionToIntersection } from './path/common';
import { FieldValues, InternalFieldName, Ref } from './fields';
import { LiteralUnion, Merge } from './utils';
import { RegisterOptions, ValidateResult } from './validator';

export type Message = string;

export type MultipleFieldErrors = {
  [K in keyof RegisterOptions]?: ValidateResult;
} & {
  [key: string]: ValidateResult;
};

export type FieldError = {
  type: LiteralUnion<keyof RegisterOptions, string>;
  ref?: Ref;
  types?: MultipleFieldErrors;
  message?: Message;
};

export type ErrorOption = {
  message?: Message;
  type?: LiteralUnion<keyof RegisterOptions, string>;
  types?: MultipleFieldErrors;
};

type FieldErrorsRecursiveStep<T> = UnionToIntersection<
  T extends object ? Merge<FieldError, FieldErrors<T>> : FieldError
>;

export type FieldErrors<T extends FieldValues = FieldValues> = {
  [K in keyof T]?: FieldErrorsRecursiveStep<T[K]>;
};

export type InternalFieldErrors = Partial<
  Record<InternalFieldName, FieldError>
>;
