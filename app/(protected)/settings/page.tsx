'use client';

import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/use-current-user';

function SettingsPage() {
  const onClick = () => {
    logout();
  };

  const user = useCurrentUser();

  return (
    <div className="bg-white p-10 rounded-xl">
      <button type="submit" onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
}

export default SettingsPage;
