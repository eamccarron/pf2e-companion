import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useCharacterLevel = () => {
  const searchParams = useSearchParams();
  const level = Number(searchParams.get('level') ?? 1);
  const router = useRouter();
  const pathname = usePathname();

  const setLevel = (level: number) => {
    router.replace(
      `${pathname}?${new URLSearchParams({
        level: level.toString(),
        className: searchParams.get('className') ?? '',
        ancestryId: searchParams.get('ancestryId') ?? '',
      })}`
    );
  };

  return [level, setLevel] as const;
};
