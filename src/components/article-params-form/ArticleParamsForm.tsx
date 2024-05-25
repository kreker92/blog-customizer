import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState, KeyboardEvent } from 'react';

export const ArticleParamsForm = () => {
	const [isOpened, setIsopened] = useState<boolean>(true);
	const sidebarButtonRef = useRef<HTMLDivElement | null>(null);
	const sidebarRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const closeSidebar = (e: Event) => {
			e.stopPropagation();
			if (isOpened && e?.target) {
				if ((e as unknown as KeyboardEvent).key === 'Escape') {
					setIsopened(false);
				} else if (
					!sidebarRef.current?.contains((e as MouseEvent).target as Node) &&
					!sidebarButtonRef.current?.contains((e as MouseEvent).target as Node)
				) {
					setIsopened(false);
				}
			}
		};

		document.addEventListener('click', closeSidebar);
		document.addEventListener('keydown', closeSidebar);

		return () => {
			document.removeEventListener('click', closeSidebar);
			document.removeEventListener('keydown', closeSidebar);
		};
	}, []);

	return (
		<>
			<ArrowButton
				btnRef={sidebarButtonRef}
				onClick={() => {
					setIsopened(!isOpened);
				}}
				isOpened={isOpened}
			/>
			<aside
				ref={sidebarRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpened,
				})}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
