'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { UserInfo } from '../_components/UserInfo';

const ClientPage = () => {
  const user = useCurrentUser();

  return <UserInfo label="Client Component" user={user} />;
};

export default ClientPage;
