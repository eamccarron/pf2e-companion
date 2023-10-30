export const fetchCompendium = async (route: string) =>
  fetch(`${process.env['COMPENDIUM_API_URL']}/${route}`);