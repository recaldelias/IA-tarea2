function funcionDeEvaluacion(tabla, player) {

    // if(gameOver(tabla) && player == 1)
    //   return -10;
    // else if(gameOver(tabla) && player== 2)
    //   return 10;
    // else 
    //   return 0;
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

function miniMax(tabla, profundidad, isMax, player) {
    let score = funcionDeEvaluacion(tabla, player);
    //console.log('score ---->',gameOver(tabla));
    if (score === 10 || score === -10) return score;

    if (isMax) {
        let best = -1000;
        for (let stonePile = 0; stonePile < tabla.length; stonePile++) {
            for (let i = 0; i < tabla[stonePile]; i++) {
                let aux = tabla[stonePile];
                tabla[stonePile] = i;
                player = (player === 1) ? 2 : 1;
                //console.log(best,'antes');
                best = Math.max(best, miniMax(tabla, profundidad + 1, false, player));
                //console.log(best,'despues');
                player = (player === 1) ? 2 : 1;
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
                player = (player === 1) ? 2 : 1;
                //console.log(best,'antes');
                best = Math.min(best, miniMax(tabla, profundidad + 1, true, player));
                //console.log(best,'despues');
                player = (player === 1) ? 2 : 1;
                tabla[stonePile] = aux;
            }
        }
        return best;
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
            let valor = miniMax(nimTable, 0, false, player);
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