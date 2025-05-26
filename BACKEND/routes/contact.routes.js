import { Router } from "express";
import wrapAsync from "../utilit/wrapAsync.js";
import checkAuth from "../middleware.js";

import {
  createContact,
  getContacts,
  searchContacts,
} from "../controllers/contact.controller.js";

const router = Router();

router.post("/", checkAuth, wrapAsync(createContact));

router.get("/", checkAuth, wrapAsync(getContacts));

router.get("/search", checkAuth, wrapAsync(searchContacts));

export default router;
