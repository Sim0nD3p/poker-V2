
export default function playerPosition(playerNumber){
    const margin = 20;
    switch(playerNumber){
        case 1: {
            return [[-0.92, -1]]
        }
        case 2: {
            return [[-0.88, 1], [0.95, 1]]
        }
        case 3: {
            return [[0.94, -1], [-1, 1], [0.76, 1]]
        }
        case 4: {
            return [[0, -1], [-1, 1], [0, 1], [1, 1]]
        }

    }
}