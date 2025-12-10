import userRoute from "./UserRoute.js";
import linkRoute from "./LinkRoute.js";
import noteRoute from "./NoteRoute.js";
import categoryRoute from "./СategoryRoute.js";

const routerApi = (app) => {
  app.use('/api/users', userRoute);
  app.use('/api/links', linkRoute);
  app.use('/api/notes', noteRoute);
  app.use('/api/categories', categoryRoute);
}

export default routerApi;