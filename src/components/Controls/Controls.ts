import styles from '@/components/Controls/Controls.module.scss';

interface IControlItem {
    text: string;
    onClick?: () => void;
}

interface IControls {
    append: (element: Element) => void;
}

const Controls = (items: Array<IControlItem[]>): IControls => {
    const wrapper = document.createElement('div');
    wrapper.className = styles.wrapper;

    const rows = items.map((row) => row.map(({ text, onClick = () => {} }) => {
        const button = document.createElement('button');
        button.className = styles.button;
        button.textContent = text;
        button.addEventListener('click', onClick);

        return button;
    }));

    rows.forEach((row) => {
        const rowElement = document.createElement('div');
        rowElement.className = styles.row;

        row.forEach((controlElement) => {
            rowElement.appendChild(controlElement);
        });

        wrapper.appendChild(rowElement);
    });

    const append = (element: Element): void => {
        element.append(wrapper);
    };

    return {
        append,
    };
};

export default Controls;
