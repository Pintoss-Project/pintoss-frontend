import { Flex } from '@/shared/components/layout';
import * as s from './MainContainer.css';

export const MainContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Flex
            className={s.container}
        >
            {children}
        </Flex>
    );
}