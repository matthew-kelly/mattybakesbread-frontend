import { browser } from '$app/environment';
import { readable } from 'svelte/store';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

const getInitialMotionPreference = () => {
	if (!browser) return false;
	return window.matchMedia(reducedMotionQuery).matches;
};

export const reducedMotion = readable(getInitialMotionPreference(), (set) => {
	if (!browser) return false;

	const updateMotionPreference = (event) => {
		set(event.matches);
	};

	const mediaQueryList = window.matchMedia(reducedMotionQuery);
	mediaQueryList.addEventListener('change', updateMotionPreference);

	return () => {
		mediaQueryList.removeEventListener('change', updateMotionPreference);
	};
});
