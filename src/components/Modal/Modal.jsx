import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Overlay, StyledModal } from './Modal.styled';

function Modal({ modalData, onModalClose }) {
  const { largeImageURL, tags } = modalData;
  const handleCloseModal = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      onModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return createPortal(
      <Overlay onClick={handleCloseModal}>
        <StyledModal>
          <img src={largeImageURL} alt={tags} />
        </StyledModal>
      </Overlay>,
      document.querySelector('#modal')
    );
  
}

Modal.propTypes = {
    modalData: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
    onModalClose: PropTypes.func,
  };

export default Modal;
