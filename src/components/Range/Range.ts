import styles from './Range.module.scss';

const Range = () => {
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '3';
    range.max = '10';
    range.className = styles.range;

    return range;
};

export default Range;
