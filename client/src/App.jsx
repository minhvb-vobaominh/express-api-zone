import './assets/styles/tailwind.css';

import {
  BrowserRouter,
  createBrowserRouter,
  NavLink,
  RouterProvider,
  Route,
  Routes,
} from 'react-router-dom';

import Home from './pages/Home';
import CreateItemPage from './pages/CreateItem';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/create', element: <CreateItemPage /> },
]);
const App = () => {
  return (
    <>
      {/* Header */}
      <header className='bg-gray-200 py-4 mb-7'>
        <div className='container mx-auto'>
          <h1 className='text-3xl text-black font-bold'>My Awesome App</h1>
        </div>
      </header>

      {/* Navbar */}
      <BrowserRouter>
        <div className='flex justify-center'>
          <div className='mx-5 -ml-5 px-5 py-2 bg-orange-300'>
            <NavLink to='/'>/home</NavLink>
          </div>
          <div className='px-5 py-2 bg-orange-300'>
            <NavLink to='/create'>/item/create</NavLink>
          </div>
        </div>

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/create' element={<CreateItemPage />} />
        </Routes>
      </BrowserRouter>

      {/* Footer */}
      <footer className='bg-gray-200 py-4 mb-0'>
        <div className='container mx-auto'>
          <p className='text-center text-gray-600'>
            &copy; 2024 My Awesome App
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
