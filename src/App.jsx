import { Route, Routes } from 'react-router-dom';

import { SigninCard } from '@/components/organisms/Auth/SigninCard';
import { SignupCard } from '@/components/organisms/Auth/SignupCard';
import { Auth } from '@/pages/Auth/Auth';
import { NotFound } from '@/pages/NotFound/NotFound';

function App() {

  return (
    <Routes>
      <Route path='/auth/signup' element={<Auth><SignupCard /></Auth>} />
      <Route path='/auth/signin' element={<Auth><SigninCard /></Auth>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;