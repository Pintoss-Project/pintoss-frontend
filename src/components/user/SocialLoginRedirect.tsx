'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import * as cs from '@/shared/styles/common.css';

const SocialLoginRedirect = () => {
    const { login } = useAuth();
    const { open, close } = useAlertContext();

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        if (accessToken) {
            login(accessToken).then(() => {
                router.push('/');
            }).catch((error) => {
                console.warn('Login error:', error);
                open({
                    width: '300px',
                    height: '200px',
                    title: '로그인 실패',
                    main: <AlertMainTextBox text="로그인에 실패하였습니다. 다시 시도해 주세요." />,
                    rightButtonStyle: cs.lightBlueButton,
                    onRightButtonClick: () => {
                        close();
                        router.push('/login');
                    },
                });
            });

        }
    }, [router, searchParams]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <h3>로그인 중입니다. 잠시만 기다려 주세요...</h3>
        </div>
    );
};

export default SocialLoginRedirect;
