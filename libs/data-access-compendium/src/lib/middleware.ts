import type { CompendiumDocument } from '../../types/CompendiumDocument';

const removeDescriptionHTML = (description: string): string =>
  description.replace(/<[^>]*>?/gm, '');

const removeDescriptionUUIDRef = (description: string): string => {
  if (description.includes('@')) {
    return description.substring(0, description.indexOf('@'));
  }

  return description;
};

export const initializeSchemaMiddleware = (schema: Schema) => {
  schema.pre('find', function (next) {
    const document = this as any;

    const { value: description } = document.system.description;

    document.system.description = removeDescriptionHTML(
      removeDescriptionUUIDRef(description)
    );

    next();
  });
};
