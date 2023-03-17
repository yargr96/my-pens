import { Vector, addVectors } from '@/utils/Vector';

export interface IParticle {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
}

export const getMovedParticle = ({ position, velocity, acceleration }: IParticle): IParticle => ({
    position: addVectors(position, velocity),
    velocity: addVectors(velocity, acceleration),
    acceleration,
});
