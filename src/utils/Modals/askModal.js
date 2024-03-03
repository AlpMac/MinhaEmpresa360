import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import api from "../../services/api.js";
import Alert from '@mui/material/Alert';



const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return React.createElement(
    animated.div,
    { ref: ref, style: style, ...other },
    React.cloneElement(children, { onClick })
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AskModal({ open, onClose, title, data }) {
  const [alertType, setAlertType] = useState(null);

  const handleCancelarServico = () => {
    if (data.id_servico) {
      api.put('/servico-cancelar', { id_servico: data.id_servico })
        .then((response) => {
          setAlertType('success');
          onClose();
        })
        .catch((error) => {
          setAlertType('error');
        });
    } else {
      setAlertType('warning');
    }
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="spring-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            <strong>Data:</strong> {data.data}
            <br />
            <strong>Endereço:</strong> {data.endereco}
            <br />
            <strong>Valor do Serviço:</strong> {data.valor} R$
          </Typography>
          <Button onClick={handleCancelarServico}>Sim</Button>
          <Button onClick={onClose}>Fechar</Button>
          {alertType && (
            <Alert variant="filled" severity={alertType}>
              {alertType === 'success' && 'Serviço cancelado com sucesso!'}
              {alertType === 'error' && 'Erro ao excluir o serviço, tente novamente!'}
              {alertType === 'warning' && 'Erro na requisição, contate o suporte!'}
            </Alert>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}

AskModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default AskModal;
