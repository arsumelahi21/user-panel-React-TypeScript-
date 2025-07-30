import { RootProvider } from './providers/RootProvider';
import { UsersPage } from '@/pages/users/UserListPage'

export default function App() {
  return (
    <RootProvider>
      <UsersPage />
    </RootProvider>
  );
}
