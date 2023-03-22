import { ControlsProps, IControlItemProps } from '@/components/Controls';
import { FramesPerSecond } from '@/utils/useRenderLoop';

interface ISizeControlItem extends IControlItemProps {
    value: number;
}

const mainControls: IControlItemProps[] = [
    {
        key: 'play',
        text: 'Play',
    },
    {
        key: 'clear',
        text: 'Clear',
    },
    {
        key: 'randomFill',
        text: 'Random fill',
    },
];

export const sizeControls: ISizeControlItem[] = [
    {
        key: 'cellSizeSmall',
        text: 'Cells small',
        value: 5,
    },
    {
        key: 'cellSizeMedium',
        text: 'Cells medium',
        value: 10,
    },
    {
        key: 'cellSizeLarge',
        text: 'Cells large',
        value: 20,
    },
];

interface ISpeedControlItem extends IControlItemProps {
    value: FramesPerSecond;
}

export const speedControls: ISpeedControlItem[] = [
    {
        key: 'speedSmall',
        text: 'Speed small',
        value: 10,
    },
    {
        key: 'speedMedium',
        text: 'Speed medium',
        value: 30,
    },
    {
        key: 'speedMax',
        text: 'Speed maximum',
        value: 'auto',
    },
];

const controlsData: ControlsProps = [
    mainControls,
    sizeControls,
    speedControls,
];

export default controlsData;
