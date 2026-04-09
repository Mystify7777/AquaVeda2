import { ZodError } from "zod";
import { error } from "../utils/response.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });

    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      return error(
        res,
        err.issues.map((item) => item.message).join(", "),
        400
      );
    }

    return next(err);
  }
};
