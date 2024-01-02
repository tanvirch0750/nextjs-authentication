import { auth, signOut } from '@/auth';

async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      <h1>Settings Page</h1>
      <h2>{JSON.stringify(session)}</h2>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}

export default SettingsPage;
