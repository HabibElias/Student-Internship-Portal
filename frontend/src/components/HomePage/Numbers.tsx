import { useRef, useEffect } from "react";

const Numbers = () => {
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counters = countersRef.current?.querySelectorAll(".counter");
    if (!counters) return;

    counters.forEach((counter) => {
      let initial_count = 0;
      const final_count = parseInt(
        (counter as HTMLElement).dataset.count || "0",
        10,
      );

      const interval = setInterval(() => {
        if (final_count < 100) {
          initial_count += 2;
        } else if (final_count < 1000) {
          initial_count += 4;
        } else {
          initial_count += 20;
        }

        (counter as HTMLElement).innerText = initial_count.toString();

        if (initial_count >= final_count) {
          clearInterval(interval);
        }
      }, 100);
    });
  }, []);

  return (
    <section
      className="-mt-60 flex flex-col items-center justify-start pb-40 md:-mt-36"
      ref={countersRef}
    >
      <div className="flex flex-wrap items-center justify-center gap-12">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <p className="mx-2 animate-pulse text-xl font-bold">+</p>
            <h2 className="counter text-4xl font-bold" data-count="6000">
              0
            </h2>
          </div>
          <h3 className="animate-pulse text-xl font-semibold opacity-80 md:text-3xl">
            Active Students
          </h3>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <p className="mx-2 animate-pulse text-xl font-bold">+</p>
            <h2 className="counter text-4xl font-bold" data-count="1000">
              0
            </h2>
          </div>
          <h3 className="text-xl font-semibold opacity-80 md:text-3xl">
            Jobs Posted
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Numbers;
