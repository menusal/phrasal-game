import { useRef, useEffect, useContext } from "react";
import { Typography } from "@mui/material";
import { animate } from "framer-motion";
import { useTheme } from '@mui/material/styles';

export default function Counter({
  from,
  to,
  duration = 1.5,
  variant = 'h6',
  color = 'white'
}: {
  from: number;
  to: number;
  duration: number;
  variant: string;
  color?: string;
}) {
  const nodeRef = useRef();
  const theme = useTheme();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: duration,
      onUpdate(value) {
        // @ts-ignore
        node.textContent = Math.floor(value);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  // @ts-ignore
  return <Typography variant={variant} ref={nodeRef} component={"span"} color={color} />;
}
