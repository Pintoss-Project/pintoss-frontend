import BackDrop from '../back-drop/BackDrop';
import { Flex } from '../layout';
import * as s from './Spinner.css';

const Spinner = () => {
	return (
		<BackDrop>
			<Flex justify="center" align="center" className={s.spinnerContainer}>
				<div className={s.spinner}></div>
			</Flex>
		</BackDrop>
	);
};

export default Spinner;
