import React, { useState } from 'react';
import { Users } from './users/Users'
import './App.css'
import { Title } from './components/Title';
import { PageHeader } from './components/PageHeader';
import { Content } from './components/Content';

function App() {
  return (
    <div className="App">
      <PageHeader>
        <Title tag="h1" title="Users App" color="#ffffff" />
      </PageHeader>
      <Content>
        <Users />
      </Content>
    </div>
  );
}

export default App;
