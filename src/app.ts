import dotenv from 'dotenv';

dotenv.config();
export const test = () => console.log(process.env);
