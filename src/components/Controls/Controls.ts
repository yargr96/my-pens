import styles from '@/components/Controls/Controls.module.scss';

interface IControlItem {
    text: string;
    onClick?: () => void;
}

interface IControls {
    append: (element: Element) => void;
}

const Controls = (items: IControlItem[]): IControls => {
    const wrapper = document.createElement('div');
    wrapper.className = styles.wrapper;

    const buttons = items.map(({ text, onClick = () => {} }) => {
        const button = document.createElement('button');
        button.className = styles.button;
        button.textContent = text;
        button.addEventListener('click', onClick);

        return button;
    });

    buttons.forEach((button) => {
        wrapper.appendChild(button);
    });

    const append = (element: Element): void => {
        element.append(wrapper);
    };

    return {
        append,
    };
};

export default Controls;
