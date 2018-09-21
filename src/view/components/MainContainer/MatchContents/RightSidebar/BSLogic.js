export const getVal = (array, obj, level) => {
    let result = array.find(e => e.tournament.tournamentId == obj.tournamentId).tournament;
    if (level >= 1) {
        let matches = result.matchs || result.value;
        result = matches.find(e => e.matchId == obj.matchId)
    };
    if (level >= 2) result = result.hasOwnProperty("groups") ? result.groups.find(e => e.id == obj.groupId) : result;
    if (level >= 3) {
        let betdomains = result.betdomains || result.Markets;
        result = betdomains.find(e => (e.betDomainId || e.id) == obj.betDomainId)
    };
    if (level === 4) {
        let odds = result.odds || result.Odds;
        result = odds.find(e => e.oddId == obj.oddId)
    };
    return result;
}

export const getValLive = (array, obj, level) => {
    let result = array[obj.matchId];
    if (level >= 1) {
        let markets = result.Markets;
        result = markets.find(e => e.id === obj.betDomainId);
    };
    if (level >= 2) {
        let markets = result.Odds;
        result = markets.find(e => e.oddId === obj.oddId);
    };
    return result;
}

export const getSystemBetsCount = (a, b) => {
    if (a < b) {
        const factorial = (length) => {
            var array = [];
            for (var i = 1; i <= length; i++) {
                array.push(i);
            }
            return array.reduce((a, b) => {
                return a * b;
            });
        };
        const rowsCount = (a, b) => {
            var count = factorial(b) / (factorial(a) * factorial(b - a));
            return count;
        };
        return rowsCount(a, b);
    }
}

export const coefsCalc = (string, arrayOfCoefs) => {
    let result = 1;
    for (let i = 0; i < string.length; i++) {
        result *= arrayOfCoefs[string.charCodeAt(i) - 65];
    }
    return result.toFixed(2);
}

export const totalSystemCoef = (arr) => ((arr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)) / arr.length).toFixed(2);

export const systemTipSize = (tournamentsCount) => ((tournamentsCount).length > 1) ? (tournamentsCount).length - 2 : 0;

export const getBonusAmount = (tipSize, array) => {
    let result = array[0].response.bonuses.find(e => parseInt(e.tipSize) === (tipSize > array[0].response.bonuses.length - 1 ? array[0].response.bonuses.length - 1 : tipSize));
    return Number(result.bonus) || 0;
}

export const systemCombinations = (array, length, bankers) => {
    let arrayofarray = [];

    if (bankers) length += bankers.length;

    for (let j = 0; j < length; j++) {
        if (j == 0) {
            arrayofarray = array.slice(j);
        }
        else {
            arrayofarray.map((current, l) => {
                array.slice(j).map((curr2, k) => {
                    if (!current.includes(curr2) && current.slice(-1) < curr2) {
                        arrayofarray.push(current + curr2);
                    }
                });
                arrayofarray = arrayofarray.filter(val => val != current);
            });
        }
    }
    if (bankers) {
        length += bankers.length;
        arrayofarray = arrayofarray.filter(
            val => {
                let checkBankers = true;
                bankers.map(el => { checkBankers = checkBankers && val.includes(el) });
                return checkBankers;
            });
    }
    return arrayofarray.slice(0, 10);
}

export const tournamentsCount = (TournamentsBets, TournamentsObj) => {
    // !!! Для Virtual: getVal(TournamentsObj, arr, 4).betdomainId

    let tournamentsCount = [];
    TournamentsBets.map((arr) => {
        if (arr.type === "prematch" && TournamentsObj.find(e => e.tournament.tournamentId == arr.tournamentId) && !tournamentsCount.includes(getVal(TournamentsObj, arr, 3).id))
                tournamentsCount.push(getVal(TournamentsObj, arr, 3).id);

        // if (arr.type === "live" 
        //     && Object.keys(TournamentsObjLive).some(e => e == arr.matchId) 
        //     && !tournamentsCount.includes(getValLive(TournamentsObjLive, arr, 1).id)) {
        //     tournamentsCount.push(getValLive(TournamentsObjLive, arr, 1).id);
        // }
    })

    return tournamentsCount;
}