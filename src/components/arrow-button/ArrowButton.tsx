import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { MutableRefObject } from 'react';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
type ArrowButtonProps = {
	onClick: OnClick;
	btnRef?: MutableRefObject<HTMLDivElement | null>;
	isOpened?: boolean;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx({
				[styles.container]: true,
				[styles.container_open]: props.isOpened,
			})}
			ref={props.btnRef}
			onClick={props.onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: true,
					[styles.arrow_open]: props.isOpened,
				})}
			/>
		</div>
	);
};
