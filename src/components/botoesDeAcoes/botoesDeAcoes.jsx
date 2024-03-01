import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import BallotIcon from '@mui/icons-material/Ballot';
import ContactsIcon from '@mui/icons-material/Contacts';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import './botoesDeAcoes.css';

const actions = [
  { icon: <CleanHandsIcon />, name: "Cadastrar Produto" },
  { icon: <BallotIcon />, name: "Cadastrar Custos" },
  { icon: <ContactsIcon />, name: "Cadastrar Cliente" },
  { icon: <RequestQuoteIcon />, name: "Cadastrar Serviço" },
  { icon: <LocalGroceryStoreIcon />, name: "Cadastrar Venda" },
];

const actions_edit = [
    { icon: <CleanHandsIcon />, name: "Editar Produto" },
    { icon: <BallotIcon />, name: "Editar Custos" },
    { icon: <ContactsIcon />, name: "Editar Cliente" },
    { icon: <RequestQuoteIcon />, name: "Editar Serviço" },
    { icon: <LocalGroceryStoreIcon />, name: "Editar Venda" },
  ];

export default function DualSpeedDialTooltipOpen() {
  const [openLeft, setOpenLeft] = React.useState(false);
  const [openRight, setOpenRight] = React.useState(false);

  const handleLeftOpen = () => setOpenLeft(true);
  const handleLeftClose = () => setOpenLeft(false);

  const handleRightOpen = () => setOpenRight(true);
  const handleRightClose = () => setOpenRight(false);

  return (
    <>
      <Box sx={{ height: 390, transform: "translateZ(0px)", flexGrow: 0 }}>
        <Backdrop open={openLeft || openRight} />
        <SpeedDial
          ariaLabel="Adicionar"
          sx={{ position: "absolute", bottom: 16, left: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleLeftClose}
          onOpen={handleLeftOpen}
          open={openLeft}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleLeftClose}
              tooltipPlacement="right"
            />
          ))}
        </SpeedDial>
     

        <Backdrop open={openLeft || openRight} />
        <SpeedDial
          ariaLabel="Adicionar"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SettingsIcon />}
          onClose={handleRightClose}
          onOpen={handleRightOpen}
          open={openRight}
        >
          {actions_edit.map((action_edit) => (
            <SpeedDialAction
              key={action_edit.name}
              icon={action_edit.icon}
              tooltipTitle={action_edit.name}
              tooltipOpen
              onClick={handleRightClose}
              tooltipPlacement="left"
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}
