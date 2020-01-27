import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import Home from "./Home";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link
      style={{ textDecoration: "none", color: "black" }}
      // onClick={() => console.log("hello")}
      to="/home"
    >
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Offer" />
      </ListItem>
    </Link>

    <Link
      style={{ textDecoration: "none", color: "black" }}
      // onClick={() => console.log("hello")}
      to="/offers"
    >
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Offer List" />
      </ListItem>
    </Link>

    {/* <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
  </div>
);

export const SecondaryListItems = props => (
  <div>
    {/* <ListSubheader inset>Saved reports</ListSubheader> */}
    <center>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        onClick={() => props.logout()}
      >
        <ListItem style={{ backgroundColor: "tomato", marginTop: 50 }} button>
          <ListItemIcon>
            <DeleteIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Link>
    </center>

    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem> */}
    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);
