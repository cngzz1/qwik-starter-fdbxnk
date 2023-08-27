import { component$ } from '@builder.io/qwik';
import styles from './hero.module.css';

type DefaultConfetti = {
  spread: number;
  ticks: number;
  gravity: number;
  decay: number;
  startVelocity: number;
  colors: string[];
  origin: {
    x: number;
    y: number;
  };
};
type ParticleOptionType = {
  particleCount: number;
  scalar: number;
  spread: number;
  ticks: number;
  gravity: number;
  decay: number;
  startVelocity: number;
  colors: string[];
  origin: {
    x: number;
    y: number;
  };
};
const defaults: DefaultConfetti = {
  spread: 360,
  ticks: 70,
  gravity: 0,
  decay: 0.95,
  startVelocity: 30,
  colors: ['006ce9', 'ac7ff4', '18b6f6', '713fc2', 'ffffff'],
  origin: {
    x: 0.5,
    y: 0.35,
  },
};
const CONFETTI_DEPENDENCY =
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
export default component$<unknown, {}>(() => {
  return (
    <div class={['container', styles.hero]}>
      <h1>
        So <span class="highlight">fantastic</span>
        <br />
        to have <span class="highlight">you</span> here
      </h1>
      <p>Have fun building your App with Qwik.</p>
      <div class={styles['button-group']}>
        <button
          onClick$={async () => {
            const globalThisValue: any = (globalThis as any).confetti as any;

            const executor: (
              resolve: (
                value:
                  | PromiseLike<(opts: unknown) => void>
                  | ((opts: unknown) => void)
              ) => void,
              reject: (reason?: unknown) => void
            ) => void = (
              resolve: (
                value:
                  | ((opts: unknown) => void)
                  | PromiseLike<(opts: unknown) => void>
              ) => void,
              reject: (reason?: unknown) => void
            ) => {
              if (globalThisValue) {
                return resolve(globalThisValue);
              }
              const script: HTMLScriptElement =
                document.createElement<'script'>('script');
              script.src = CONFETTI_DEPENDENCY;
              script.onload = () => resolve(globalThisValue);
              script.onerror = reject;
              document.head.appendChild<HTMLScriptElement>(script);
              script.remove();
            };
            const loadConfetti: () => Promise<(opts: unknown) => void> = () => {
              return new Promise<(opts: unknown) => void>(executor);
            };

            const confetti: (opts: unknown) => void = await loadConfetti();
            const shootOption: ParticleOptionType = {
              ...defaults,
              particleCount: 80,
              scalar: 1.2,
            };
            const particleOptions: ParticleOptionType = {
              ...defaults,
              particleCount: 60,
              scalar: 0.75,
            };
            function shoot(): void {
              confetti(shootOption);
              confetti(particleOptions);
            }

            setTimeout(shoot, 0);
            setTimeout(shoot, 100);
            setTimeout(shoot, 200);
            setTimeout(shoot, 300);
            setTimeout(shoot, 400);
          }}
        >
          Time to celebrate
        </button>
        <a
          href="https://qwik.builder.io/docs"
          target="_blank"
          class="button button-dark"
        >
          Explore the docs
        </a>
      </div>
    </div>
  );
});
