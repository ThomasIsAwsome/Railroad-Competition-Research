








export function sortPointsByDistance({nodes, node}) {

    const points = nodes
    const target = node
    const [targetX, targetY] = target;

    return points
    .map((point) => {
      const [x, y] = point;
      const dx = x - targetX;
      const dy = y - targetY;
      
      // Calculate exact Euclidean distance
      const distance = Math.sqrt(dx * dx + dy * dy);

      return {
        node: point,
        distance: Number(distance) // rounded for clean display
      };
    })
    .sort((a, b) => a.distance - b.distance);
}
