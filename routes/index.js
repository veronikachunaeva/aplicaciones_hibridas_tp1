import userRoute from "./UserRoute.js";
import linkRoute from "./LinkRoute.js";
import noteRoute from "./NoteRoute.js";

const routerApi = (app) => {
  app.use('/api/users', userRoute);
  app.use('/api/links', linkRoute);
  app.use('/api/notes', noteRoute);
}

export default routerApi;