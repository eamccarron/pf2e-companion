const removeDescriptionHTML = (description: string): string =>
  description.replace(/<[^>]*>?/gm, '');

const removeDescriptionUUIDRef = (description: string): string => {
  if (description.includes('@')) {
    return description.substring(0, description.indexOf('@'));
  }

  return description;
};

/** @deprecated Duplicated code. Switch to libs/data-access-compendium/utils/formatCompendiumJSON */
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
