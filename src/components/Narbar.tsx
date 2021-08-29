// import React, { useState, useEffect } from "react";
// import images from "./images.jpeg";
// import "./Navbar.css";

// function Navbar() {
//   const [loggedIn, setLoggedIn] = useState<any>(
//     localStorage.getItem("authToken")
//   );

//   useEffect(() => {
//     setLoggedIn(localStorage.getItem("authToken"));
//   }, []);

//   return (
//     <>
//       <div className="Container">
//         <img src={images} width="250" className="sidebar" alt="" />
//         <div className="Container-wrapper">
//           {loggedIn === "true" ? (
//             <>
//               <a href="/logout">Logout</a>
//             </>
//           ) : (
//             <>
//               <a href="/auth">Login</a>
//               <a href="/">Register</a>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import images from "./images.jpeg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logo: {
      maxWidth: 660,
      width: 350,
      marginLeft: theme.spacing(0),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function ButtonAppBar() {
  const [loggedIn, setLoggedIn] = useState<any>(
    localStorage.getItem("authToken")
  );

  useEffect(() => {
    setLoggedIn(localStorage.getItem("authToken"));
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={images} alt="logo" className={classes.logo} />

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Expense Tracker
          </Typography>
          {loggedIn ? (
            <Button>Log out</Button>
          ) : (
            <>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
