"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxId = void 0;
const getMaxId = async (model) => {
    const maxId = await model.max('id');
    return maxId ? maxId + 1 : 1; // Increment by 1 or start with 1
};
exports.getMaxId = getMaxId;
// export const getMaxId = async <TModel extends { max: (field: string) => Promise<number | null> }>(
//   model: TModel
// ): Promise<number> => {
//   const maxId = await model.max('id'); // Ensure `model.max` exists
//   return maxId ? maxId + 1 : 1; // Increment by 1 or start with 1
// };
