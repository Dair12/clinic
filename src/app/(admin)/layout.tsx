import { isAuthorized } from '@/lib/isAuthorized';
import { isAdmin } from '@/lib/isAdmin';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await isAuthorized();
  await isAdmin(); 
  return <>{children}</>;
}