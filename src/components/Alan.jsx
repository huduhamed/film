import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect } from 'react';

// TODO: pause as alan AI isn't granting free interactions
const Alan = () => {
	useEffect(() => {
		alanBtn({
			key: '',
			onCommand: ({ command, mode }) => {
				if (command === 'changeMode') {
					// if (mode === 'light') {
					// } else {
					// }
				}
			},
		});
	}, []);
	return <div></div>;
};

export default Alan;
