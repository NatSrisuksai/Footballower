/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  StarIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Sidebar(props) {
  const [open, setOpen] = React.useState(0);
  const navigate = useNavigate();
  const favTeamArr = props.favTeam;

  function logoutHandle() {
    fetch("https://footballower-backend.vercel.app/logout", {
      method: "POST",
      credentials: "include", // Include cookies for session management
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to log out");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message); //  Log the success message
        // Navigate to the home page or a different page after successful logout
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error); // Handle the error
      });
  }

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    props.onGetFav();
  }, [props]);

  function getClubDetail(e) {
    const name = e.currentTarget.getAttribute("name");
    const team = props.data.find((t) => t.name === name);
    if (team) {
      props.onParse(team.name, team.url); // Pass the team name and URL
    }
  }

  return (
    <Card className="h-[calc(100vh-4rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3 bg-yellow-300"
            >
              <ListItemPrefix>
                <StarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-normal ml-2 "
              >
                Favourite Team
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {favTeamArr.map((item, index) => (
                <ListItem
                  key={index}
                  onClick={getClubDetail}
                  name={item.team}
                  className="bg-yellow-100"
                >
                  <ListItemPrefix>
                    <ChevronRightIcon
                      strokeWidth={3}
                      className="h-3 w-5 mr-2"
                    />
                  </ListItemPrefix>
                  {item.team}
                </ListItem>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        {/* <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem> */}

        <ListItem onClick={logoutHandle} className="bg-red-500">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
