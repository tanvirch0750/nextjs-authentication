'use client';

import { useSession, signOut } from 'next-auth/react';

function SettingsPage() {
  //const session = await auth(); //if server component

  const onClick = () => {
    signOut();
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
