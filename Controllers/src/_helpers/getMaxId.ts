interface ModelDef {
   max: (field: string) => Promise<number | null>;
}

export const getMaxId = async<TModel extends ModelDef>(model: TModel): Promise<number> => {
  const maxId = await model.max('id');
  return maxId ? maxId + 1 : 1; // Increment by 1 or start with 1
};

// export const getMaxId = async <TModel extends { max: (field: string) => Promise<number | null> }>(
//   model: TModel
// ): Promise<number> => {
//   const maxId = await model.max('id'); // Ensure `model.max` exists
//   return maxId ? maxId + 1 : 1; // Increment by 1 or start with 1
// };
