import Dashboard from "layouts/dashboard";
import Shared from "layouts/shared";
import Profile from "layouts/profile";
import AddDocument from "layouts/addDocument";

import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Shared",
    key: "shared",
    icon: <Icon fontSize="small">folder_shared</Icon>,
    route: "/shared",
    component: <Shared />,
  },
    {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Add Document",
    key: "add_document",
    icon: <Icon fontSize="small">add_moderator</Icon>,
    route: "/add-document",
    component: <AddDocument />,
  },

];

export default routes;
