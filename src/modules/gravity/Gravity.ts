import Canvas from '@/components/Canvas';
import { IParticle, getMovedParticle } from '@/utils/Particle';
import { Vector, getVectorAngle, polarToCartesianVector } from '@/utils/Vector';

import colors from '@/styles/colors.module.scss';

const config = {
    speed: 1.4,
    size: 20,
    decelerationCoefficient: 0.99,
};

const Gravity = () => {
    const {
        element: canvas,
        setSize,
        append,
        getContext,
    } = Canvas();

    setSize();
    append(document.body);

    const context: CanvasRenderingContext2D = getContext();

    let particles: IParticle[] = [];

    let mouse: Vector = [canvas.width / 2, canvas.height / 2];

    const addParticle = (position: Vector): void => {
        particles.push({
            position,
            velocity: [Math.random() * 10 - 5, Math.random() * 10 - 5],
            acceleration: [0, 0],
        });
    };

    const clear = (): void => {
        context.fillStyle = colors.dark;
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateParticles = (): void => {
        particles = particles.map(({ position, velocity }) => {
            const angle = getVectorAngle([
                mouse[0] - position[0],
                mouse[1] - position[1],
            ]);

            const particle = getMovedParticle({
                position,
                acceleration: polarToCartesianVector(config.speed, angle),
                velocity: [
                    velocity[0] * config.decelerationCoefficient,
                    velocity[1] * config.decelerationCoefficient
                ],
            });

            const halfSize = config.size / 2;

            if (
                (particle.position[0] + halfSize >= canvas.width && particle.velocity[0] > 0)
                || (particle.position[0] - halfSize < 0 && particle.velocity[0] < 0)
            ) {
                particle.velocity[0] *= -1;
            }

            if (
                (particle.position[1] + halfSize >= canvas.height && particle.velocity[1] > 0)
                || (particle.position[1] - halfSize < 0 && particle.velocity[1] < 0)
            ) {
                particle.velocity[1] *= -1;
            }

            return particle;
        });
    };

    const draw = (): void => {
        context.fillStyle = colors.light;

        particles.forEach((particle) => {
            context.beginPath();
            context.arc(
                particle.position[0],
                particle.position[1],
                config.size / 2,
                0,
                Math.PI * 2,
            );
            context.fill();
        });
    };

    let renderFrameGlobal: () => void;

    const render = () => {
        const renderFrame = () => {
            if (renderFrame !== renderFrameGlobal) {
                return;
            }

            clear();
            updateParticles();
            draw();

            requestAnimationFrame(renderFrame);
        };

        renderFrameGlobal = renderFrame;
        renderFrame();
    };

    for (let i = 0; i < 100; i += 1) {
        addParticle([
            canvas.width * Math.random(),
            canvas.height * Math.random(),
        ]);
    }

    render();

    canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
        mouse = [offsetX * 2, offsetY * 2];
    });
};

export default Gravity;
