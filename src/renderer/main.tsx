import { createRoot } from "react-dom/client";
import App from "./App";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import loader from "./lib/loader";
import ErrorPage from "./pages/ErrorPage";
const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <MainLayout />,
    loader: loader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "projects/:projectId",
        element: <ProjectDetailsPage />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
