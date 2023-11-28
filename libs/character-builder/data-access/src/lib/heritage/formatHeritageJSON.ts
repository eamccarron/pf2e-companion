export const formatHeritageJSON = (heritages: Array<any>) =>
  heritages.map(
    ({
      name: heritageName,
      system: {
        description: { value: description },
      },
      _id: id,
    }) => ({
      id,
      primary: heritageName,
      secondary: description,
    })
  );
