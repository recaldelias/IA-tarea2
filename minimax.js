function funcionDeEvaluacion(tabla) {
    let resultado = 0;
    for (let i = 0; i < tabla.length; i++) {
        resultado ^= tabla[i];
    }
    return (resultado === 0) ? 10 : -10;

}

function isWinnable(tabla) {
    let cantidad = 0;
    for (let i = 0; i < tabla.length; i++) {
        if (tabla[i] > 0) cantidad++;
    }
    return cantidad;
}

function miniMax(tabla, profundidad = 0, isMax = false) {
    let score = funcionDeEvaluacion(tabla);
    //console.log('score ---->',gameOver(tabla));
    if (score === 10 || score === -10) return score;

    if (isMax) {
        let best = -1000;
        for (let stonePile = 0; stonePile < tabla.length; stonePile++) {
            for (let i = 0; i < tabla[stonePile]; i++) {
                let aux = tabla[stonePile];
                tabla[stonePile] = i;
                //console.log(best,'antes');
                best = Math.max(best, miniMax(tabla, profundidad + 1, false));
                //console.log(best,'despues');
                tabla[stonePile] = aux
            }
        }
        return best;
    } else {
        let best = 1000;
        for (let stonePile = 0; stonePile < tabla.length; stonePile++) {
            for (let i = 0; i < tabla[stonePile]; i++) {
                let aux = tabla[stonePile];
                tabla[stonePile] = i;
                //console.log(best,'antes');
                best = Math.min(best, miniMax(tabla, profundidad + 1, true));
                //console.log(best,'despues');
                tabla[stonePile] = aux;
            }
        }
        return best;
    }


}

function miniMaxAlpha(tabla, profundidad = 0, isMax = false, alpha = Number.MIN_SAFE_INTEGER, beta = Number.MAX_SAFE_INTEGER) {
    let score = funcionDeEvaluacion(tabla);
    //console.log('score ---->',gameOver(tabla));
    if (score === 10 || score === -10) return score;

    if (isMax) {    //ia
        let bestVal = Number.MIN_SAFE_INTEGER;
        for (let stonePile = 0; stonePile < tabla.length; stonePile++) {
            for (let i = 0; i < tabla[stonePile]; i++) {
                let aux = tabla[stonePile];
                tabla[stonePile] = i;
                //console.log(best,'antes');
                const value = miniMax(tabla, profundidad + 1, false, alpha, beta);
                bestVal = Math.max(bestVal, value);
                alpha = Math.max(alpha, bestVal);
                tabla[stonePile] = aux
                if (beta <= alpha) break;
                //console.log(best,'despues');
            }
        }
        return bestVal;
    } else {    //
        let bestVal = Number.MAX_SAFE_INTEGER;
        for (let stonePile = 0; stonePile < tabla.length; stonePile++) {
            for (let i = 0; i < tabla[stonePile]; i++) {
                let aux = tabla[stonePile];
                tabla[stonePile] = i;
                const value = miniMax(tabla, profundidad + 1, true, alpha, beta);
                bestVal = Math.min(value, bestVal);
                beta = Math.min(beta, bestVal)
                //console.log(best,'antes');
                //console.log(best,'despues');
                tabla[stonePile] = aux;
                if (beta <= alpha) break
            }
        }
        return bestVal;
    }
}


function encontrarMejorMovimiento(nimTable, tablero, player) {
    let mejorValor = -1000;
    let mejorMovimiento = {
        "columna": -1, "cantidad": -1
    };

    for (let i = 0; i < nimTable.length; i++) {

        for (let j = 0; j <= nimTable[i]; j++) {
            let aux = nimTable[i];
            nimTable[i] = j;
            player = (player === 1) ? 2 : 1;
            let valor = miniMax(nimTable);
            console.log('i : ', i, ' j : ', j);
            nimTable[i] = aux;
            player = (player === 1) ? 2 : 1;
            console.log(valor, ' ', mejorValor);
            if (valor >= mejorValor && j > 0) {
                mejorValor = valor;
                mejorMovimiento.columna = i;
                mejorMovimiento.cantidad = j;
                console.log('---> ', mejorMovimiento);
            }
        }
    }
    console.log(tablero);
    console.log('olaa encontre algo jaja que facha', mejorMovimiento);
    for (let i = 0; i < mejorMovimiento.cantidad; i++) {
        tablero[mejorMovimiento.columna].pop();
        console.log('seraiko');
    }
    player = (player === 1) ? 2 : 1;
    nimTable[mejorMovimiento.columna] -= mejorMovimiento.cantidad;
    console.log(tablero);
    console.log(nimTable);
}