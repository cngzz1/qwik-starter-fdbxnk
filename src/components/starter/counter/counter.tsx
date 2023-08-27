import { component$, useSignal, $, QRL, Signal } from '@builder.io/qwik';
import styles from './counter.module.css';
import Gauge from '../gauge';

export default component$<unknown, {}>(() => {
  const count: Signal<number> = useSignal<number>(70);

  const setCount: QRL<(newValue: number) => void> = $<
    (newValue: number) => void
  >((newValue: number) => {
    if (newValue < 0 || newValue > 100) {
      return;
    }
    count.value = newValue;
  });

  return (
    <div class={styles['counter-wrapper']}>
      <button
        class="button-dark button-small"
        onClick$={() => setCount(count.value - 1)}
      >
        -
      </button>
      <Gauge value={count.value} />
      <button
        class="button-dark button-small"
        onClick$={() => setCount(count.value + 1)}
      >
        +
      </button>
    </div>
  );
});
