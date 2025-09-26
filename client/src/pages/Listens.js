import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PodcastList from '../components/PodcastList';
import PodcastDetail from './PodcastDetail';

const Listens = () => {
  return (
    <Routes>
      <Route path="/" element={<PodcastList />} />
      <Route path="/:id" element={<PodcastDetail />} />
    </Routes>
  );
};

export default Listens;
