import React, { Component } from 'react';
import { AppWrapper } from './App.styled';
import fetchImages from '../utils/PixabayAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

export class App extends Component {
  state = {
    images: [],
    value: '',
    page: 1,
    isLoading: false,
    isModalOpen: false,
    modalData: null,
  };

  componentDidUpdate(_, prevState) {
    const { value, page, images } = this.state;

    if (page !== prevState.page || value !== prevState.value) {
      this.setState({ isLoading: true });
      fetchImages(value, page)
        .then(({ data }) =>
          this.setState({ images: [...images, ...data.hits] })
        )
        .catch(err => alert(err.message))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleSearchbarSubmit = value => {
    this.setState({ value, page: 1, images: [] });
  };

  setModalData = modalData => {
    this.setState({ modalData, isModalOpen: true });
  };

  changePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { images, isLoading, modalData, isModalOpen } = this.state;
    return (
      <>
        <Searchbar onFormSubmit={this.handleSearchbarSubmit} />
        <AppWrapper>
          <ImageGallery images={images} onImageClick={this.setModalData} />
        </AppWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          images.length > 0 && <Button onClick={this.changePage} />
        )}
        {isModalOpen && (
          <Modal modalData={modalData} onModalClose={this.handleModalClose} />
        )}
      </>
    );
  }
}

export default App;
