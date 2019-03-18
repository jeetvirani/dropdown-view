import React from 'react';
import { Layout, Input } from '../styles';

const InputBox = props => (
  <Layout>
    <Input placeholder="Search by Rank, Grade, Channel_name" {...props} />
  </Layout>
);

export default InputBox;
