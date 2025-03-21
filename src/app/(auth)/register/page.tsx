import * as s from '@/components/auth/AuthStyle.css';
import { cookies } from 'next/headers';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthSection from '@/components/auth/AuthSection';
import { Flex } from '@/shared/components/layout';
import RegisterMain from '@/components/auth/register/RegisterMain';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Register = ({ searchParams }: Props) => {
  const cookieStore = cookies();
  const emailFromCookie = cookieStore.get('email');
  const accessTokenCookie = cookieStore.get('accessToken');
  const emailFromURL = searchParams.email as string | undefined;
  const loginType = searchParams.loginType as string | undefined;

  const email = emailFromURL || emailFromCookie?.value;

  return (
    <Flex justify="center" className={s.container}>
      <AuthSection
        header={<AuthHeader title="회원가입" />}
        main={
          <RegisterMain
            oAuthEmail={email}
            loginType={loginType as 'LOCAL' | 'KAKAO' | 'NAVER' | undefined}
            accessToken={accessTokenCookie?.value}
          />
        }
        marginTop="84px"
      />
    </Flex>
  );
};

export default Register;
