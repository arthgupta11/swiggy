declare module 'Db' {
    import { Sequelize } from 'sequelize';
    import { Restraunts } from './src/Models/Restraunts';
  
    const sequelize: Sequelize;
    export { Restraunts, sequelize };
  }
  