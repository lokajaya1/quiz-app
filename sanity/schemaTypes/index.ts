import { type SchemaTypeDefinition } from "sanity";
import questions from "../lib/questions";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [questions],
};
