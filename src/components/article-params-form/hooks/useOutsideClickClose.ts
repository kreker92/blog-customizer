import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	refs: React.RefObject<HTMLElement>[];
	tags: (keyof HTMLElementTagNameMap)[];
};

export const useOutsideClickClose = ({
	isOpen,
	refs,
	onChange,
	tags,
}: UseOutsideClickClose) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!refs.some((ref) => ref.current?.contains(target)) &&
				!tags.some(
					(tag: keyof HTMLElementTagNameMap) =>
						(target as HTMLElement).tagName.toLocaleLowerCase() === tag
				)
			) {
				onChange?.(false);
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [isOpen, onChange]);
};