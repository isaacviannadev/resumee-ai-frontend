import classNames from 'classnames';
import Image from 'next/image';

type LogoProps = {
  isLoading?: boolean;
};

export default function Logo({ isLoading = false }: LogoProps) {
  return (
    <Image
      src='/logo2.svg'
      alt='Resumee.ai'
      width={600}
      height={200}
      className={classNames({
        'animate-pulse': isLoading,
      })}
    />
  );
}
