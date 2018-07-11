import React from 'react';
// import { connect } from "react-redux";

 class RegPage extends React.Component {
 
    render() {
        const { classes } = this.props;
        return (
            
          <div>
 
            <div className="registration__wrapper">
              <div className="registration-form">
                  <h3>
                      Registration
                  </h3>

                  <ul>
                      <li>
                          <div className="input-container">
                              <div className="labelContainer">
                                  <label>Login details</label>
                                  <label className="requiredAsterix">*</label>
                              </div>
                              <div className="inputSection">
                                  <input className="" type="text" placeholder="Your email address" />
                              </div>
                              <div className="inputSection">
                                  <input className="" type="text" placeholder="Your username" />
                              </div>
                              <div className="control-group">
                                  <div className="inputSection dub">
                                      <input className="" type="password" placeholder="Choose a password" />
                                  </div>
                                  <div className="inputSection dub">
                                      <input className="" type="password" placeholder="Confirm password" />
                                  </div>
                              </div>

                          </div>
                      </li>
                      <li>
                          <div className="input-container">
                              <div className="labelContainer">
                                  <label>Your mobile number</label>
                                  <label className="requiredAsterix">*</label>
                              </div>
                              <div className="control-group">
                                  <div className="inputSection countrycode">
                                      <select name="" id="">
                                          <option value="+1">+1</option>
                                          <option value="+20">+20</option>
                                          <option value="+212">+212</option>
                                          <option value="+213">+213</option>
                                          <option value="+216">+216</option>
                                          <option value="+218">+218</option>
                                          <option value="+220">+220</option>
                                          <option value="+221">+221</option>
                                          <option value="+222">+222</option>
                                          <option value="+223">+223</option>
                                          <option value="+224">+224</option>
                                          <option value="+225">+225</option>
                                          <option value="+226">+226</option>
                                          <option value="+227">+227</option>
                                          <option value="+228">+228</option>
                                      </select>
                                  </div>
                                  <div className="inputSection">
                                      <input className="" type="text" placeholder="(012)345-67-89" />
                                  </div>
                              </div>
                          </div>
                      </li>
                      <li>
                          <div className="input-container">
                              <div className="labelContainer">
                                  <label>Personal Details</label>
                                  <label className="requiredAsterix">*</label>
                              </div>
                              <div className="inputSection">
                                  <input className="" type="text" placeholder="First Name" />
                              </div>
                              <div className="inputSection">
                                  <input className="" type="text" placeholder="Last Name" />
                              </div>
                          </div>
                          <div className="input-container">
                              <div className="control-group__birthday">
                                  <span className="input">
                                          <select className="control-select" name="birthday-month">
                                                  <option value="00" hidden>Day</option>
                                                  <option value="01">01</option>
                                                  <option value="02">02</option>
                                                  <option value="03">03</option>
                                                  <option value="04">04</option>
                                                  <option value="05">05</option>
                                                  <option value="06">06</option>
                                                  <option value="07">07</option>
                                                  <option value="08">08</option>
                                                  <option value="09">09</option>
                                                  <option value="10">10</option>
                                                  <option value="11">11</option>
                                                  <option value="12">12</option>
                                                  <option value="12">13</option>
                                                  <option value="12">14</option>
                                                  <option value="12">15</option>
                                                  <option value="12">16</option>
                                                  <option value="12">17</option>
                                                  <option value="12">18</option>
                                              </select>                        </span>
                                  <span className="select">
                                      <select className="control-select" name="birthday-month">
                                          <option value="00" hidden>Month</option>
                                          <option value="01">January</option>
                                          <option value="02">February</option>
                                          <option value="03">March</option>
                                          <option value="04">April</option>
                                          <option value="05">May</option>
                                          <option value="06">June</option>
                                          <option value="07">July</option>
                                          <option value="08">August</option>
                                          <option value="09">September</option>
                                          <option value="10">October</option>
                                          <option value="11">November</option>
                                          <option value="12">December</option>
                                      </select>
                                  </span>
                                  <span className="input">
                                      <input type="text" className="input__control" name="birthday-year" value="" maxlength="4" placeholder="Year" autocomplete="off" />
                                  </span>
                              </div>
                          </div>
                      </li>
                      <li>
                          <div className="input-container">
                              <div className="labelContainer">
                                  <label>Affiliate</label>
                              </div>
                              <div className="inputSection">
                                  <input className="" type="text" placeholder="Affiliate code" />
                              </div>
                          </div>
                      </li>
                      <li>
                          <div className="checkbox__blk">
                              <input id="acceptTerms" type="checkbox"  />
                              <label for="acceptTerms">I confirm that I am over 18 years old.</label>
                          </div>
                      </li>
                      <li className="submit-area">
                          <input type="button" value="Create Account" id="SubmitForm" className="open-account-button" />
                      </li>
                      <li className="social-registration">
                          <div className="horizontal-separator-container short-separator">
                              <span className="horizontal-separator">or</span>
                          </div>
                          <div id="SubmitForm" className="open-account-button-facebook"><i className="facebook__icon"></i>Register with Facebook</div>
                      </li>

                  </ul>

              </div>
          </div>
          </div>

        )
    }
}

export default RegPage;






// function mapStateToProps (state) {
//     return {
//         state:{
//         }
//     }
//   }
  
// export default connect(mapStateToProps)(MainContainer)