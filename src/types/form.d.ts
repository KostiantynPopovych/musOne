import { ConfigProps, InjectedFormProps } from 'redux-form';

export type InnerFormProps<
  ComponentProps = {},
  ComponentFields = {}
> = ComponentProps & InjectedFormProps<ComponentFields>;

export type OuterFormProps<
  ComponentProps = {},
  ComponentFields = {}
> = ComponentProps & Omit<ConfigProps<ComponentFields, ComponentProps>, 'form'>;
