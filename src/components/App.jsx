import React, { useState, useEffect} from 'react';
import { AppWrapper } from './App.styled';
import fetchImages from '../utils/PixabayAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModaldata] = useState(null);



  useEffect(() => {
    if (value === '') return;
    setIsLoading(true);
    fetchImages(value, page)
      .then(({ data }) => setImages( prevState => [...prevState, ...data.hits] ))
      .catch(err => alert(err.message))
      .finally(() => setIsLoading(false));
  }, [page, value]);

  const handleSearchbarSubmit = value => {
    setPage(1);
    setValue(value);
    setImages([]);
  };

  const changeModalData = modalData => {
    setModaldata(modalData);
    setIsModalOpen(true);
  };

  const changePage = () => {
    setPage(prev => prev + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

    return (
      <>
        <Searchbar onFormSubmit={handleSearchbarSubmit} />
        <AppWrapper>
          <ImageGallery images={images} onImageClick={changeModalData} />
        </AppWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          images.length > 0 && <Button onClick={changePage} />
        )}
        {isModalOpen && (
          <Modal modalData={modalData} onModalClose={handleModalClose} />
        )}
      </>
    );
}

export default App;
