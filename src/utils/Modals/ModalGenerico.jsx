import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Alterado para ser responsivo
  maxWidth: 500, // Largura máxima do modal
  bgcolor: 'background.paper',
  border: '2px solid',
  boxShadow: 24,
  p: 4,
};

const buttonBarStyle = {
  display: 'flex',
  justifyContent: 'flex-end', // Botões à direita
  marginTop: 'auto', // Empurra a barra de botões para a parte inferior
  color: 'white',
};

const iconWrapperStyle = {
  display: 'flex',
  alignItems: 'left',
};

const iconStyle = {
  marginLeft: 1,
};

function GenericModal({ open, onClose, onCloseParentModal, title, data, alertMessage, alertType }) {
  const [alertMessage2, setAlertMessage] = useState('');

  useEffect(() => {
    if (alertMessage === 'success') {
      setAlertMessage(alertMessage);
    } else {
      setAlertMessage('');
    }
  }, [alertMessage]);

  const handleClose = () => {
    setAlertMessage('');
    onClose();
    if (alertMessage === 'success') {
      onCloseParentModal();
    }
  };

  return (
    <Modal
      aria-labelledby="generic-modal-title"
      aria-describedby="generic-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Box sx={{ ...buttonBarStyle, ...(alertMessage === 'success' ? { bgcolor: 'green' } : { bgcolor: 'red' }) }}>
            <div style={iconWrapperStyle}>
              {alertMessage === 'success' && <CheckCircleOutlineIcon sx={iconStyle} />}
              {alertMessage === 'error' && <ErrorOutlineIcon sx={iconStyle} />}
            </div>
          </Box>
          <Typography id="generic-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="generic-modal-description" sx={{ mt: 2 }}>
            {data && (
              <>
                <strong>Dado Adicionado: </strong> {data}
              </>
            )}
          </Typography>
          {alertType && (
            <Alert variant="filled" severity={alertType}>
              {alertMessage2}
            </Alert>
          )}
          <Box sx={buttonBarStyle}>
            <Button onClick={handleClose}>Confirmar</Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

GenericModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCloseParentModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.string,
  alertMessage: PropTypes.string,
  alertType: PropTypes.string,
};

export default GenericModal;
