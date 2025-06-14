import { isAuthorized } from '@/lib/isAuthorized';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await isAuthorized(); // это можно даже без await — важно, чтобы компонент был async

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}