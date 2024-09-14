import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventPage from './pages/EventPage';
import CreateEventPage from './pages/CreateEventPage';
import Header from './components/Header';
import EventDetailPage from './pages/EventDetailPage';
import ManageJoinRequestsPage from './pages/ManageJoinRequestsPage';
import { UserProvider } from './context/userContext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <UserProvider>
        <Routes>
          <Route path="/"  element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={ <RegisterPage />} />
          <Route path="/events" element={<ProtectedRoute>
                <EventPage />
                </ProtectedRoute>
                
             } />
          <Route path="/create-event" element={ 
            <ProtectedRoute>
                <CreateEventPage />
                </ProtectedRoute>
              } />
          <Route path="/events/:id" element={ 
            <ProtectedRoute>
                <EventDetailPage />
                </ProtectedRoute>}
               />
          <Route path="/events/:eventId/manage-requests" element={
            <ProtectedRoute>
                <ManageJoinRequestsPage />
                </ProtectedRoute>
              } />
        </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
