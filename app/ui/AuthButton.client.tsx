'use client'
import { useSession } from 'next-auth/react';
import { Button } from 'flowbite-react';
import { signIn, signOut } from '@/app/lib/auth-util';

export default function AuthButton() {
  const session = useSession();

  return session?.data?.user ? (
    <Button color='light' onClick={async () => {
      await signOut();
      await signIn();
    }}>Sign out</Button>
  ) : (
    <Button onClick={async () => await signIn()}>Sign in</Button>
  )

}