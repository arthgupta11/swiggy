
export const getMaxId = async (model: any): Promise<number> => {
    const maxId = await model.max('id');
    return maxId ? maxId + 1 : 1; // Increment by 1 or start with 1
  };
