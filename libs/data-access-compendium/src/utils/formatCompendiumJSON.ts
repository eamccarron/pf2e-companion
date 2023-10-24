/** @deprecated Migrated into schema middleware (lib/middleware.ts) */
const removeDescriptionHTML = (description: string): string =>
  description.replace(/<[^>]*>?/gm, '');

/** @deprecated Migrated into schema middleware (lib/middleware.ts) */
const removeDescriptionUUIDRef = (description: string): string => {
  if (description.includes('@')) {
    return description.substring(0, description.indexOf('@'));
  }

  return description;
};

/** @deprecated Migrated into middleware which runs on mongoose schemas */
export const formatCompendiumJSON = (
  json: object | Array<object>
): Array<object> => {
  if (!Array.isArray(json)) {
    return formatCompendiumJSON([json]);
  }

  return json.map((item) => {
    const { value: description } = item.system.description;

    return {
      ...item,
      system: {
        ...item.system,
        description: removeDescriptionHTML(
          removeDescriptionUUIDRef(description)
        ),
      },
    };
  });
};
