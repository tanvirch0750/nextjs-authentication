import { auth } from '@/auth';

async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      <h1>Settings Page</h1>
      <h2>{JSON.stringify(session)}</h2>
    </div>
  );
}

export default SettingsPage;
