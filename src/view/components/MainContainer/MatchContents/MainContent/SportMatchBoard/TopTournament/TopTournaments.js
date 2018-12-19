import React, {Fragment} from 'react';
import {connect} from "react-redux";
import TopTournamentData from "./TopTournamentData";
import Collapse from "@material-ui/core/Collapse/Collapse";
import {isWidthUp} from "@material-ui/core/withWidth";
import withWidth from "@material-ui/core/withWidth/withWidth";

class TopTournaments extends React.PureComponent {

    state = {
        selectedTopTournaments: [],
        selectedTopTournamentsCounter:0,
        icons:[]
    }


    componentDidMount() {

        if(isWidthUp('md', this.props.width)) {
            if (this.state.selectedTopTournamentsCounter === 0 && !this.props.state.tournamentCounter.currentTopTournament) {
                if (Array.isArray(this.props.state.topTournaments)) {

                    let topTournaments = this.props.state.topTournaments.sort(function (a, b) {
                        return a["sort"] - b["sort"];
                    });
                    this.setState({
                        selectedTopTournaments: [topTournaments[0]["id"]],
                        selectedTopTournamentsCounter: 1
                    })
                }
            }
        }

        if(this.state.selectedTopTournamentsCounter===0 && this.props.state.tournamentCounter.currentTopTournament){
            let ind =this.props.state.topTournaments.findIndex((e)=>{return e.id==this.props.state.tournamentCounter.currentTopTournament})
            if(ind!=-1){
                this.setState({selectedTopTournaments:[ this.props.state.topTournaments[ind]["id"]],
                    selectedTopTournamentsCounter:1})
            }


        }

    }

    componentDidUpdate(prevProps,prevState,snapshot) {
        if(isWidthUp('md', this.props.width)) {
            if ((this.state.selectedTopTournamentsCounter === 0 && !this.props.state.tournamentCounter.currentTopTournament) || (this.state.selectedTopTournaments.length === 0)) {
                if (Array.isArray(this.props.state.topTournaments)) {

                    let topTournaments = this.props.state.topTournaments.sort(function (a, b) {
                        return a["sort"] - b["sort"];
                    });
                    this.setState({
                        selectedTopTournaments: [topTournaments[0]["id"]],
                        selectedTopTournamentsCounter: 1
                    })
                }
            }
        }
            if(
                (this.props.state.tournamentCounter.currentTournamentCounter===0) &&
                (this.props.state.tournamentCounter.currentTopTournament) &&
                (this.props.state.tournamentCounter.currentTopTournament!=prevProps.state.tournamentCounter.currentTopTournament)
            ){
                let ind =this.props.state.topTournaments.findIndex((e)=>{return e.id==this.props.state.tournamentCounter.currentTopTournament})
                if(ind!=-1){
                    this.setState({selectedTopTournaments:[ this.props.state.topTournaments[ind]["id"]],
                        selectedTopTournamentsCounter:1})
                }


            }


    }

    componentWillUnmount() {

        this.props.dispatch({type: 'TOP_TOURNAMENT_ID', payload: null});


    }

    selectTopTournament = (val) => {
      if(this.state.selectedTopTournamentsCounter!==0){
          if (this.state.selectedTopTournaments.includes(val)) {
              let array = [...this.state.selectedTopTournaments];
              let index = array.indexOf(val)
              if (index !== -1) {
                  array.splice(index, 1);
                  this.setState({selectedTopTournaments: [],selectedTopTournamentsCounter:0});
              }
          } else {
              this.props.dispatch({type: 'TOP_TOURNAMENT_ID', payload: val});
              this.setState(prevState => ({
                  selectedTopTournaments: [ val],
                  selectedTopTournamentsCounter:1
              }))
          }
      }else{
          if (Array.isArray(this.props.state.topTournaments)) {

                  let topTournaments = this.props.state.topTournaments.sort(function (a, b) {
                      return a["sort"] - b["sort"];
                  });
                  this.setState({selectedTopTournaments:[ topTournaments[0]["id"]],
                      selectedTopTournamentsCounter:1})
              }

      }

    }

    render() {

        let selectedTopTournaments = this.state.selectedTopTournaments;
        let topTournaments = this.props.state.topTournaments;
        return (

            <Fragment>
                <section className="categories-filter">

                    <div className="tournament-filter__header scroll-watcher">

                        {isWidthUp('md', this.props.width)?(
                            <div className={"tournament-filter__breadcrumbs TopTournaments"}>
                                <i className={"cell icon-cell TopTournaments"}></i>
                                <div className="cell title-cell">
                                    <span className="catName">Top tournaments</span>&nbsp;
                                </div>

                            </div>):null
                        }

                    </div>
                    {isWidthUp('md', this.props.width)?(
                        <Collapse
                            in={true}
                            timeout={0}
                            classes={{wrapperInner: 'tournament-odd-group TopTournaments'}}
                            id="odd-group-382"
                            collapsedHeight={(['xs', 'sm'].includes(this.props.width)) ? '32px' : '0'}
                        >
                            {
                                (Array.isArray(topTournaments)) ? (
                                    topTournaments.sort(function (a, b) {
                                        return a["sort"] - b["sort"];
                                    }).slice(0, 8).map((val, index) =>
                                        <div key={index} title={val.txt}
                                             className={selectedTopTournaments.includes(val.id) ? 'item active' : 'item '}
                                             onClick={() => this.selectTopTournament(val.id)}>{val.name} </div>
                                    )
                                ) : null

                            }
                        </Collapse>
                    ):null}
                    {

                    }
                    {
                        (Array.isArray(topTournaments)) ? (
                            selectedTopTournaments.map((val) => {
                                let tournament = topTournaments.find(element => {

                                    return element.id === val;
                                })
                                return (
                                    <Fragment key={tournament["defaultName"]}>
                                        <TopTournamentData  key={tournament["defaultName"]} tournament={tournament}/>
                                    </Fragment>
                                )
                            })
                        ) : null
                    }


                </section>
            </Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {

    return {
        ...ownProps,
        state: {
            topTournaments: state.sportList.top_tournaments,
            currentTournamentData: state.currentTournamentData,
            tournamentCounter: state.topTournament,
            sportList: state.sportList,
        }
    }
}

export default connect(mapStateToProps)(withWidth()(TopTournaments))


/*
                                 <div className="cell controls-cell">
                                    <div
                                        className={"collapse icon-cell "}
                                        id="colps1"
                                        title="Show/Hide"
                                        onClick={this.toggleCommonMenu}
                                    ></div>
                                </div>
* */