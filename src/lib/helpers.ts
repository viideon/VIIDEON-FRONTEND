export const getIconPosition = (position: string) => {
  switch (position) {
    case "top-left":
      return { x: 20, y: 20 };
    case "bottom-left":
      return { x: 20, y: 600 };
    case "bottom-right":
      return { x: 1160, y: 600 };
    case "top-right":
      return { x: 1160, y: 20 };
    default:
      return { x: 0, y: 0 };
  }
};
