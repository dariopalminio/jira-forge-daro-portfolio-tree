import { useEffect } from "react";

type Event = MouseEvent | TouchEvent;

const useSplitableContainer = (id: string | undefined) => {
    useEffect(() => {
        const splitBarId = `#${id ? id : ''}split__bar`;
        const splitLeftId = `#${id ? id : ''}split__left`;
        const bar: HTMLElement | null = document.querySelector(splitBarId);
        const left: HTMLElement | null = document.querySelector(splitLeftId);
        let mouse_is_down = false;

        const mousedownListener = (event: Event) => {
            mouse_is_down = true;
        };

        const mousemoveListener = (event: MouseEvent) => {
            if (!mouse_is_down) return;

            if (left != null) {
                left.style.width = `${event.clientX}px`;
            }

        };

        const mouseupListener = () => {
            mouse_is_down = false;
        };

        if (bar != null) {
            bar.addEventListener('mousedown', mousedownListener)
        }
        document.addEventListener('mousemove', mousemoveListener)
        document.addEventListener('mouseup', mouseupListener)

        return () => {
            if (bar != null) {
                bar.removeEventListener('mousedown', mousedownListener)
            }
            document.removeEventListener("mousemove", mousemoveListener);
            document.removeEventListener("mouseup", mouseupListener);
        };
    }, []);
};

export default useSplitableContainer;