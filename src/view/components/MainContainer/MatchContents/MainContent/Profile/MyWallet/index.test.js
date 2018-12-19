import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import Button from "@material-ui/core/Button/Button";

import DialogDeposit, {SUCCESS_TEXT_DEPOSIT, WAIT_FOR_DEPOSIT_TEXT} from "./DialogDeposit";
import DialogWithdraw, {SUCCESS_TEXT_WITHDRAW} from "./DialogWithdraw";
import {MyWallet} from './index';

configure({adapter: new Adapter()});

describe('MyWallet component', () => {
    it('should render correctly', () => {
        const classes = {cell: 'some-fake-string'};
        const wrapper = shallow(<MyWallet title="Wildfowl" classes={classes}/>);

        // dialog should be closed on init
        expect(wrapper.find('.payment-systems')).toHaveLength(1);
        expect(wrapper.find(DialogWithdraw).prop('open')).toEqual(false);

        // dialog appear on payment system icon click
        wrapper.find('.row.system-w > .cell').last().simulate('click');
        expect(wrapper.find(DialogWithdraw).prop('open')).toEqual(true);
    });
});

import { JSDOM } from 'jsdom';
import {STATE_NAME_SUCCESS} from "./AbstractPaymentDialog";

const doc = new JSDOM('<!doctype html><html><body/></html>');
global.document = doc;
global.window = doc.defaultView;

describe('DialogDeposit component', () => {
    it('should render correctly with beforeTransaction popup', () => {
        const wrapper = mount(<DialogDeposit open={true} settings={
            {
                title: 'Orange Money',
                system: 'OrangeMoney',
                src: null,
                fields: ['Phone'],
                beforeInstruction: {
                    label: "Dial #150*4*4# on your mobile phone and follow the instructions"
                }
            }
        }/>);

        expect(wrapper.state().open).toEqual(true);

        wrapper.find(Button).at(1).simulate('click');
        expect(wrapper.state().stateName).toEqual("showAttentionBefore");
        expect(wrapper.find(Button).at(1).text()).toEqual("Continue");
    });
    it('should render correctly when wait for decision from "payment-svc"', () => {
        const wrapper = mount(<DialogDeposit open={true} settings={
            {
                title: 'Orange Money',
                system: 'OrangeMoney',
                src: null,
                fields: ['Phone'],
                beforeInstruction: {
                    label: "Dial #150*4*4# on your mobile phone and follow the instructions"
                }
            }
        }/>);
        wrapper.setState({ stateName: 'waitDecision' }); // skip real request for payment
        expect(wrapper.find(DialogContentText).at(0).text()).toEqual(WAIT_FOR_DEPOSIT_TEXT);
    });
    it('should render correctly when payment will be finished with success', () => {
        const wrapper = mount(<DialogDeposit open={true} settings={
            {
                title: 'Orange Money',
                system: 'OrangeMoney',
                src: null,
                fields: ['Phone'],
                beforeInstruction: {
                    label: "Dial #150*4*4# on your mobile phone and follow the instructions"
                }
            }
        }/>);
        wrapper.setState({ stateName: STATE_NAME_SUCCESS }); // skip real request for payment
        expect(wrapper.find(DialogContentText).at(0).text()).toEqual(SUCCESS_TEXT_DEPOSIT);
    });

});

describe('DialogWithdraw component', () => {
    it('should render correctly with edit profile step', () => {
        const obj = mount(<DialogWithdraw open={true} settings={
            {
                title: 'Orange Money',
                system: 'OrangeMoney',
                fields: [],
                editProfile: true,
                waitStatus: false,
            }
        }/>);

        expect(obj.state().open).toEqual(true);
        expect(obj.state().stateName).toEqual("editProfile");

        expect(obj.find(DialogContentText).text()).toEqual("Confirm Phone number");
        expect(obj.find(Button).at(1).text()).toEqual("Update");
    });

    it('should render correctly when payment will be finished with success', () => {
        const wrapper = mount(<DialogWithdraw open={true} settings={
            {
                title: 'Orange Money',
                system: 'OrangeMoney',
                fields: [],
                editProfile: true,
                waitStatus: false,
            }
        }/>);
        wrapper.setState({ stateName: STATE_NAME_SUCCESS }); // skip real request for payment
        expect(wrapper.find(DialogContentText).at(0).text()).toEqual(SUCCESS_TEXT_WITHDRAW);
    });
});