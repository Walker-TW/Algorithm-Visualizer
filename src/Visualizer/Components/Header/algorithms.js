export const algorithmInfo = [
  {
    id: 'dijkstra',
    name: 'Dijkstra',
    header: 'Weighted',
    content:
      'Running Time:\nO( | E | log | V | )\nAlways finds the shortest path.',
    footer: 'Uses distance of nodes to choose the direction to travel.',
  },
  {
    id: 'astar-e',
    name: 'A* Euclidean',
    header: 'Weighted',
    content:
      'Running Time:\nO( log ( h* )( x ) )\nWill not always find the shortest path.',
    footer: 'Uses as the crow flies heuristic to decide direction of search.',
  },
  {
    id: 'astar-m',
    name: 'A* Manhatten',
    header: 'Weighted',
    content: 'Running Time:\nO( log ( h* )( x ) )\nWill find the shortest path',
    footer: 'Uses the “taxi cab” heuristic for non diagonal graphs.',
  },
  {
    id: 'dfs',
    name: 'Depth First Search',
    header: 'Not Weighted',
    content:
      'Running Time:\nO( | V | + | E | )\nWill not find the shortest path',
    footer: 'Searches every branch of a graph',
  },
  {
    id: 'bfs',
    name: 'Breadth First Search',
    header: 'Not Weighted',
    content: 'Running Time:\nO( | V | + | E | )\nWill find the shortest path',
    footer:
      'Will search paths only after its current path has been fully explored.',
  },
];

export default algorithmInfo;
