import projectFeatuerHandlers from "./projects/handlers";
import templateHandlers from "./templates/handlers";

const initHandlers = () => {
  projectFeatuerHandlers();
  templateHandlers();
};

export default initHandlers;
