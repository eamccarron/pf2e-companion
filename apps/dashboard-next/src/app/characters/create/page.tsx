'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CharacterCreation() {
  const router = useRouter();

  useEffect(() => {
    router.push('/characters/create/character-class');
  }, [router]);

  return <></>;
}
