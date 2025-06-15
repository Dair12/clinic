import { isAuthorized } from '@/lib/isAuthorized';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await isAuthorized();
  return <>{children}</>;
}