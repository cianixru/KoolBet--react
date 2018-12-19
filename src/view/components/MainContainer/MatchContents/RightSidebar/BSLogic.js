export const getVal = (array, obj, level) => {
    let result = array.find(e => parseInt(e.tournament.tournamentId, 10) === parseInt(obj.tournamentId, 10)).tournament;
    if (level >= 1) {
        let matches = result.matchs || result.value;
        result = matches.find(e => parseInt(e.matchId, 10) === parseInt(obj.matchId, 10))
    }
    ;
    if (level >= 2)
        result = (result && result.hasOwnProperty("groups")) ? result.groups.find(e => e.id === obj.groupId) : result;
    // console.log('object :', result.id);
    if (level >= 3) {
        let betdomains = result.betdomains || result.Markets;
        result = betdomains.find(e => (e.betDomainId || e.id) === obj.betDomainId)
    }
    ;
    if (level === 4) {
        let odds = result.odds || result.Odds;
        result = odds.find(e => e.oddId === obj.oddId)
    }
    ;
    return result;
}

export const getValLive = (array, obj, level) => {
    let result = array[obj.matchId];
    if (level >= 1) {
        let markets = result.Markets;
        result = markets.find(e => parseInt(e.id, 10) === parseInt(obj.betDomainId, 10));
    }
    ;
    if (level >= 2) {
        let markets = result.Odds;
        result = markets.find(e => parseInt(e.oddId, 10) === parseInt(obj.oddId, 10));
    }
    ;
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
    let _result;
    if (array)
        _result = array.response.bonuses.find((e) => (parseInt(e.tipSize, 10) <= tipSize))
    if (_result)
        return Number(_result.bonus)
    else
        return 0
}

export const systemCombinations = (array, length, bankers, matchObjArray) => {
    let arrayofarray = [];

    function combine(input, len, start) {
        if (len === 0) {
            arrayofarray.push(res.join(""))
            return;
        }
        for (let i = start; i <= input.length - len; i++) {
            res[res.length - len] = input[i];
            combine(input, len - 1, i + 1);
        }
    }

    let res = [];
    res.length = length;

    if (typeof array !== 'undefined' && typeof arrayofarray !== 'undefined') {
        combine(array, res.length, 0);
    }

    if (bankers) {
        //length += bankers.length;

        arrayofarray = arrayofarray.filter(
            val => {
                let checkBankers = true;

                bankers.map((el) => {
                    let letterIndex = matchObjArray.findIndex(e => {
                        return e.OddId === el
                    });
                    if (letterIndex != -1) {
                        checkBankers = checkBankers && !val.includes(array[letterIndex])
                    } else {
                        checkBankers = false;
                    }

                });
                return checkBankers;
            });
    }
    return arrayofarray.slice(0, 10);
}


/*
let result = [];
result.length = 4; //n=2

function combine(input, len, start) {
  if(len === 0) {
    console.log( result.join(" ") ); //process here the result
    return;
  }
  for (var i = start; i <= input.length - len; i++) {
    result[result.length - len] = input[i];
    combine(input, len-1, i+1 );
  }
}

const array = ["a", "b", "c", "d","e","f","g","h","j","k"];
combine( array, result.length, 0);
 */