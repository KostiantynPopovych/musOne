type DefaultValueType = number | string;

export type ValidityChecker<
  V = DefaultValueType,
  AV = { [key: string]: DefaultValueType }
> = (value: V, allValues?: AV) => boolean;

export type ValidationErrorMessage =
  | string
  | undefined
  | {
      key: string;
      options?: {
        [key: string]: unknown;
      };
    };

export type Validator<
  V = DefaultValueType,
  AV = { [key: string]: DefaultValueType }
> = (value: V, allValues?: AV) => ValidationErrorMessage;

export function createValidator<
  V = DefaultValueType,
  AV = { [key: string]: DefaultValueType }
>(
  validator: ValidityChecker<V, AV> | Validator<V, AV>,
  message: ValidationErrorMessage = 'Validation error'
): Validator<V, AV> {
  return (value: V, allValues?: AV) => {
    const invalid = validator(value, allValues);

    return invalid ? message : undefined;
  };
}

export const isRequired = createValidator(value => !value && value !== 0, {
  key: 'IS_REQUIRED'
});
