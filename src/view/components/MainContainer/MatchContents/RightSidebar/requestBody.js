

export const requestBody = (numOfArray, TournamentsBets, betList, isVirtual) => {
    let obj = {};
    let pageType = [];

    let values = TournamentsBets.map((arr, index) => {
        let matchObj = betList.matchObj[index];
        let obj = {};
        if (isVirtual) {
            if (matchObj && matchObj.hasOwnProperty("Test")) {
                obj.matchId = matchObj.MatchId;
                obj.btrMatchId = matchObj.BtrMatchId;
                // obj.tournamentId = matchObj.TournamentId;
                obj.isOutrightType = matchObj.IsOutrightType;
                obj.betTitle = matchObj.discriminator;
                obj.betTitleType = matchObj.BetTitleType;
                obj.odds = matchObj.Odds;
            }
        }
        else {
            if (arr.type === "prematch") {
                if (matchObj && matchObj.hasOwnProperty("Test")) {
                    obj.matchId = matchObj.MatchId;
                    obj.btrMatchId = matchObj.BtrMatchId;
                    // obj.tournamentId = matchObj.TournamentId;
                    obj.isOutrightType = matchObj.IsOutrightType;
                    obj.betTitle = matchObj.BetTitle;
                    obj.betTitleType = matchObj.BetTitleType;
                    obj.odds = matchObj.Odds;
                }
            }
            if (arr.type === "live") {
                if (matchObj && matchObj.hasOwnProperty("Test")) {
                    obj.matchId = matchObj.MatchId;
                    obj.btrMatchId = matchObj.BtrMatchId;
                    // obj.tournamentId = matchObj.TournamentId;
                    obj.isOutrightType = false;
                    obj.betTitle = matchObj.BetTitle;
                    obj.betTitleType = matchObj.BetTitleType;
                    obj.odds = matchObj.Odds;
                }
            }
        }
        return obj;
    });

    if (currentTab === 0) {
        let arr = TournamentsBets[numOfArray];
        let type = TournamentsBets[numOfArray].type;

        if (this.props.TournamentsObj.find(e => e.tournament.tournamentId === arr.tournamentId) || Object.keys(this.props.TournamentsObjLive).some(e => e === arr.matchId)) {
            (betSlip.sameStake === false)
                ? obj.stakeAmount = betList.variousStakeValue[arr.oddId]
                : obj.stakeAmount = betList.stakeValue;

            if (type === "prematch") obj.totalProbability = getVal(this.props.TournamentsObj, arr, 4).value;
            if (type === "live") obj.totalProbability = getValLive(this.props.TournamentsObjLive, arr, 2).value;
            if (isVirtual) obj.totalProbability = getVal(this.props.TournamentsObj, arr, 4).value;
        }
        obj.values = [values[numOfArray]];
    }
    else {
        obj.stakeAmount = betList.stakeValue;
        obj.totalProbability = (currentTab === 1 || currentTab === 2) ? (currentTab === 1 ? multiplePossibleWinStake.toFixed(2) : totalSystemCoef(coefsCalcArr)) : "";
        obj.values = values;
    }
    obj.betType = (currentTab === 1 || currentTab === 2) ? (currentTab === 1 ? "cmb" : "sys") : "sng";
    obj.maxWin = betAmount;
    obj.minBet = minBet;

    TournamentsBets.map((item, i, arr) => {
        if (!pageType.includes(TournamentsBets[i].type))
            pageType.push(TournamentsBets[i].type)
    })

    if (!isVirtual) {
        if (pageType.includes("prematch") && !pageType.includes("live")) obj.pageType = "0";
        if (pageType.includes("live") && !pageType.includes("prematch")) obj.pageType = "1";
        if (pageType.includes("live") && pageType.includes("prematch")) obj.pageType = "2";
    }
    else {
        obj.pageType = "10";
    }

    (currentTab !== 0) ? obj.bonusPercent = 1 + (bonusAmount / 100) : obj.bonusPercent = "1.00";
    if (currentTab !== 0) obj.bonusValue = calculateBonus;
    if (currentTab === 2) {
        obj.bankers = bankerOdds;
        obj.numberOfWinners = betList.systemRadioValue;
    }
    return obj;
}



/* export const getLimitsJSON = (getLimits) => {

}
 */
