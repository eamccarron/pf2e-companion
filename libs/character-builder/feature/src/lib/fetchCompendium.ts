export const fetchCompendium = async (
  route: string,
  urlParams?: Record<string, string> | null
) => {
  return urlParams
    ? fetch(
        `${process.env['COMPENDIUM_API_URL']}/${route}?${new URLSearchParams(
          urlParams
        )}`
      )
    : fetch(`${process.env['COMPENDIUM_API_URL']}/${route}`);
};
