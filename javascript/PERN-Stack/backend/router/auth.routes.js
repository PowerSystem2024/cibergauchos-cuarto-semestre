import Router from "express-promise-router";
import {
  signin,
  signup,
  signout,
  profile,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";
import { validateSchema } from "../middleware/validate.middleware.js";
import { signinSchema, signupSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/signin", signin);

router.post("/signup", validateSchema(signupSchema), signup);

router.post("/signout", signout);

router.get("/profile", isAuth, profile);

export default router;
