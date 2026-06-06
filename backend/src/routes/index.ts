import { Router } from "express";
import { journalRouter } from "../modules/journal/journal.routes";
import { workTypesRouter } from "../modules/workTypes/workTypes.routes";

export const apiRouter = Router();

apiRouter.use("/journal-entries", journalRouter);
apiRouter.use("/work-logs", journalRouter);
apiRouter.use("/work-types", workTypesRouter);
