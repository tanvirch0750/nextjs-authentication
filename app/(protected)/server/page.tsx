import { currentUser } from '@/lib/auth';
import { UserInfo } from '../_components/UserInfo';

async function ServerPage() {
  const user = await currentUser();
  return <UserInfo label="Server component" user={user} />;
}

export default ServerPage;
