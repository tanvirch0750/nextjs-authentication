'use client';

import { logout } from '@/actions/logout';
import { useSession, signOut } from 'next-auth/react';

function SettingsPage() {
  //const session = await auth(); //if server component

  const onClick = () => {
    logout();
  };

  const session = useSession();

  return (
    <div>
      <h1>Settings Page</h1>

      <button type="submit" onClick={onClick}>
        Sign Out
      </button>

      <h2>{JSON.stringify(session)}</h2>
    </div>
  );
}

export default SettingsPage;
