import styles from '@/components/Controls/Controls.module.scss';

export interface IControlItemProps {
    key: string;
    text: string;
}

interface IElementsMap {
    [key: string]: Element,
}

interface IControls {
    append: (element: Element) => void;
    elements: IElementsMap;
}

export type ControlsProps = Array<IControlItemProps[]>;

const Controls = (items: ControlsProps): IControls => {
    const wrapper = document.createElement('div');
    wrapper.className = styles.wrapper;

    const elements: IElementsMap = {};

    const rows = items.map((row) => row.map(({ key, text }) => {
        const button = document.createElement('button');
        button.className = styles.button;
        button.textContent = text;

        elements[key] = button;

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
        elements,
        append,
    };
};

export default Controls;
